import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
  Circle,
} from "@react-google-maps/api";
import { useCallback, useEffect, useRef, useState } from "react";
import Driver_image from "../assets/images/Driver_image.png";
import homeActivity from "../assets/images/home_activity.png";
import CampusRideFooter from "../components/CampusRideFooter";
import CampusRideHeader from "../components/CampusRideHeader";
import { format } from "date-fns";

const LandingPage = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [locationAccuracy, setLocationAccuracy] = useState(null);
  const [showInfoWindow, setShowInfoWindow] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);
  const [showFallback, setShowFallback] = useState(false);
  const locationInitialized = useRef(false);
  const fallbackTimeoutRef = useRef(null);
  // Ride creation states
  const [pickupInput, setPickupInput] = useState("");
  const [dropoffInput, setDropoffInput] = useState("");
  const [showMapModal, setShowMapModal] = useState(false);
  const [pickupCoord, setPickupCoord] = useState(null);
  const [dropoffCoord, setDropoffCoord] = useState(null);
  const [mapSelectionStep, setMapSelectionStep] = useState("pickup"); // 'pickup' or 'dropoff'
  const [distance, setDistance] = useState(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [scheduleType, setScheduleType] = useState("now"); // 'now' or 'future'
  const [futureDate, setFutureDate] = useState("");
  const [futureTime, setFutureTime] = useState("");

  const getCurrentLocation = useCallback(() => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation not supported"));
        return;
      }

      const options = {
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 0,
      };

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          console.log("Location obtained:", { latitude, longitude, accuracy });

          resolve({
            lat: latitude,
            lng: longitude,
            accuracy: accuracy,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          reject(error);
        },
        options
      );
    });
  }, []);

  useEffect(() => {
    if (locationInitialized.current) return;
    locationInitialized.current = true;

    const initializeLocation = async () => {
      try {
        console.log("Starting location detection...");
        const location = await getCurrentLocation();

        setUserLocation(location);
        setLocationAccuracy(location.accuracy);
        setIsLoading(false);

        // Set a timeout to show fallback if Google Maps doesn't load
        fallbackTimeoutRef.current = setTimeout(() => {
          if (!mapLoaded) {
            console.log("Google Maps failed to load, showing fallback");
            setShowFallback(true);
          }
        }, 5000);
      } catch (error) {
        console.error("Error:", error);

        if (error.message.includes("Geolocation")) {
          setLocationError("Geolocation not supported");
        } else if (error.message.includes("denied") || error.code === 1) {
          setLocationError(
            "Location access denied. Please allow location access in your browser settings."
          );
        } else if (error.code === 2) {
          setLocationError(
            "Location unavailable. Please check your internet connection."
          );
        } else if (error.code === 3) {
          setLocationError("Location request timeout. Please try again.");
        } else {
          setLocationError("Failed to get location. Please try again.");
        }

        // Fallback to default location (Dhaka, Bangladesh)
        const defaultLocation = { lat: 23.7937, lng: 90.4066, accuracy: null };
        setUserLocation(defaultLocation);
        setIsLoading(false);
        setShowFallback(true);
      }
    };

    initializeLocation();

    return () => {
      if (fallbackTimeoutRef.current) {
        clearTimeout(fallbackTimeoutRef.current);
      }
    };
  }, [getCurrentLocation, mapLoaded]);

  const handleRetryLocation = useCallback(async () => {
    setLocationError(null);
    setIsLoading(true);
    setUserLocation(null);
    setLocationAccuracy(null);
    setShowInfoWindow(false);
    setMapError(false);
    setShowFallback(false);
    setMapLoaded(false);
    locationInitialized.current = false;

    if (fallbackTimeoutRef.current) {
      clearTimeout(fallbackTimeoutRef.current);
    }

    try {
      console.log("Retrying location detection...");
      const location = await getCurrentLocation();
      setUserLocation(location);
      setLocationAccuracy(location.accuracy);
      setIsLoading(false);

      // Set timeout for fallback
      fallbackTimeoutRef.current = setTimeout(() => {
        if (!mapLoaded) {
          setShowFallback(true);
        }
      }, 5000);
    } catch (error) {
      console.error("Error getting location:", error);
      setLocationError("Location access denied or unavailable");
      setIsLoading(false);
      setShowFallback(true);
    }
  }, [getCurrentLocation, mapLoaded]);

  const handleMapClick = useCallback(() => {
    if (userLocation) {
      const googleMapsUrl = `https://www.google.com/maps?q=${userLocation.lat},${userLocation.lng}`;
      console.log("Opening Google Maps:", googleMapsUrl);
      window.open(googleMapsUrl, "_blank", "noopener,noreferrer");
    }
  }, [userLocation]);

  const mapContainerStyle = {
    width: "100%",
    height: "100%",
    borderRadius: "12px",
  };

  const mapOptions = {
    disableDefaultUI: false,
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: true,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: true,
    styles: [
      {
        featureType: "poi",
        elementType: "labels",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "transit",
        elementType: "labels",
        stylers: [{ visibility: "off" }],
      },
    ],
  };

  const onLoad = useCallback((map) => {
    console.log("Google Maps loaded successfully");
    setMapLoaded(true);
    setMapError(false);
    setShowFallback(false);

    // Clear the fallback timeout since map loaded successfully
    if (fallbackTimeoutRef.current) {
      clearTimeout(fallbackTimeoutRef.current);
    }
  }, []);

  const onError = useCallback((error) => {
    console.error("Google Maps error:", error);
    setMapError(true);
    setShowFallback(true);

    // Clear the fallback timeout since we're showing fallback now
    if (fallbackTimeoutRef.current) {
      clearTimeout(fallbackTimeoutRef.current);
    }

    // Check for specific billing error
    if (error.message && error.message.includes("BillingNotEnabled")) {
      setLocationError(
        "Google Maps API requires billing to be enabled. Please enable billing for your API key."
      );
    } else {
      setLocationError(
        "Google Maps API error. Please check your API key and billing settings."
      );
    }
  }, []);

  // Helper: Calculate distance using Google Maps API with fallback to Haversine
  const calculateDistance = async (point1, point2) => {
    // Try Google Maps Distance Matrix API first (more accurate)
    if (window.google && window.google.maps) {
      try {
        const service = new window.google.maps.DistanceMatrixService();
        return new Promise((resolve, reject) => {
          service.getDistanceMatrix(
            {
              origins: [new window.google.maps.LatLng(point1.lat, point1.lng)],
              destinations: [new window.google.maps.LatLng(point2.lat, point2.lng)],
              travelMode: window.google.maps.TravelMode.DRIVING,
            },
            (response, status) => {
              if (status === "OK") {
                const dist = response.rows[0].elements[0].distance.value; // in meters
                console.log("Distance from Google API:", (dist / 1000).toFixed(2), "km");
                resolve(dist);
              } else {
                console.warn("Google API failed, using Haversine fallback:", status);
                // Fallback to Haversine formula
                const haversineDist = calculateHaversineDistance(point1, point2);
                resolve(haversineDist);
              }
            }
          );
        });
      } catch (error) {
        console.warn("Google API error, using Haversine fallback:", error);
        return calculateHaversineDistance(point1, point2);
      }
    } else {
      // Fallback to Haversine formula if Google Maps not loaded
      return calculateHaversineDistance(point1, point2);
    }
  };

  // Haversine formula fallback (straight-line distance)
  const calculateHaversineDistance = (point1, point2) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (point2.lat - point1.lat) * Math.PI / 180;
    const dLon = (point2.lng - point1.lng) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(point1.lat * Math.PI / 180) * Math.cos(point2.lat * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c; // Distance in kilometers
    const distanceInMeters = distance * 1000;
    console.log("Distance from Haversine (straight-line):", distance.toFixed(2), "km");
    return distanceInMeters;
  };

  // Handlers for input fields
  const handlePickupChange = (e) => setPickupInput(e.target.value);
  const handleDropoffChange = (e) => setDropoffInput(e.target.value);

  // Ride button click: open map modal
  const handleRideClick = (e) => {
    e.preventDefault();
    setShowMapModal(true);
    setPickupCoord(null);
    setDropoffCoord(null);
    setMapSelectionStep("pickup");
    setDistance(null);
  };

  // Map click handler for modal
  const handleMapModalClick = async (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    if (mapSelectionStep === "pickup") {
      setPickupCoord({ lat, lng });
      setMapSelectionStep("dropoff");
      console.log("Pickup location selected:", { lat, lng });
    } else if (mapSelectionStep === "dropoff") {
      setDropoffCoord({ lat, lng });
      // Calculate distance using Google API with fallback
      try {
        const dist = await calculateDistance(pickupCoord, { lat, lng });
        setDistance(dist);
        console.log("Dropoff location selected:", { lat, lng });
        console.log("Final distance:", (dist / 1000).toFixed(2), "km");
      } catch (error) {
        console.error("Distance calculation failed:", error);
        setDistance(null);
      }
    }
  };

  // Next button in map modal
  const handleMapNext = () => {
    setShowMapModal(false);
    setShowScheduleModal(true);
  };

  // Schedule modal next/submit
  const handleScheduleSubmit = () => {
    // Here you can send pickupCoord, dropoffCoord, distance, and schedule info to backend or next step
    setShowScheduleModal(false);
    // Reset or show confirmation as needed
  };

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <div className="bg-[#f4f8f9] text-[#1f2b38] font-sans min-h-screen">
        {/* Header */}
        <CampusRideHeader />

        {/* Hero Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 px-10 py-14 items-center gap-12 bg-[#eaf4f5]">
          <div>
            <h1 className="text-5xl font-bold leading-tight mb-6">
              Go anywhere with{" "}
              <span className="inline-block relative highlight-banner px-4 py-1">
                <span className="relative z-10 text-white font-bold">
                  CampusRide
                </span>
              </span>
            </h1>

            <div className="bg-white p-6 rounded-2xl shadow-lg space-y-4">
              <input
                type="text"
                placeholder="Pick-up Location"
                className="w-full p-3 border rounded-lg text-sm"
                value={pickupInput}
                onChange={handlePickupChange}
              />
              <input
                type="text"
                placeholder="Drop-off Location"
                className="w-full p-3 border rounded-lg text-sm"
                value={dropoffInput}
                onChange={handleDropoffChange}
              />
              <div className="flex justify-between items-center pt-2">
                <button
                  className="bg-[#17252A] text-white px-6 py-2 rounded-full text-sm hover:opacity-90 transition"
                  onClick={handleRideClick}
                >
                  Ride
                </button>
                <button className="text-gray-600 text-sm hover:underline">
                  See more options
                </button>
              </div>
            </div>
          </div>

          {/* Map */}
          <div>
            <div className="rounded-xl shadow-md w-full h-96 bg-gray-100 flex items-center justify-center relative overflow-hidden">
              {isLoading && (
                <div className="text-center absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
                  <div>
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700 mx-auto mb-2"></div>
                    <p className="text-gray-600">Loading your location...</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Please allow location access if prompted
                    </p>
                  </div>
                </div>
              )}

              {locationError && !isLoading && (
                <div className="text-center p-4 absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
                  <div>
                    <div className="text-red-500 mb-2">
                      <svg
                        className="w-8 h-8 mx-auto mb-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                        />
                      </svg>
                      <p className="text-sm">{locationError}</p>
                    </div>
                    <button
                      onClick={handleRetryLocation}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
                    >
                      Try Again
                    </button>
                  </div>
                </div>
              )}

              {userLocation && !isLoading && !showFallback && !mapError && (
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={userLocation}
                  zoom={15}
                  options={mapOptions}
                  onClick={handleMapClick}
                  onLoad={onLoad}
                >
                  {mapLoaded && (
                    <>
                      <Marker
                        position={userLocation}
                        title="Your Current Location"
                        onClick={() => setShowInfoWindow(true)}
                      />
                      {locationAccuracy && (
                        <Circle
                          center={userLocation}
                          radius={locationAccuracy}
                          options={{
                            fillColor: '#4285F4',
                            fillOpacity: 0.1,
                            strokeColor: '#4285F4',
                            strokeOpacity: 0.3,
                            strokeWeight: 1,
                          }}
                        />
                      )}
                    </>
                  )}

                  {showInfoWindow && (
                    <InfoWindow
                      position={userLocation}
                      onCloseClick={() => setShowInfoWindow(false)}
                    >
                      <div className="p-2">
                        <h3 className="font-semibold text-sm">Your Location</h3>
                        <p className="text-xs text-gray-600">
                          Lat: {userLocation.lat.toFixed(6)}
                          <br />
                          Lng: {userLocation.lng.toFixed(6)}
                        </p>
                        {locationAccuracy && (
                          <p className="text-xs text-gray-500 mt-1">
                            {getAccuracyDescription(locationAccuracy)}
                          </p>
                        )}
                      </div>
                    </InfoWindow>
                  )}
                </GoogleMap>
              )}

              {userLocation && !isLoading && (showFallback || mapError) && (
                <div
                  className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl cursor-pointer hover:shadow-lg transition-shadow flex items-center justify-center relative"
                  onClick={handleMapClick}
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Your Location
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {userLocation.lat.toFixed(6)}, {userLocation.lng.toFixed(6)}
                    </p>
                    <button
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMapClick();
                      }}
                    >
                      Open in Google Maps
                    </button>
                    <p className="text-xs text-gray-500 mt-2">
                      Click to open in Google Maps
                    </p>
                  </div>
                  <div className="absolute top-4 right-4 bg-white bg-opacity-90 px-2 py-1 rounded text-xs text-gray-700">
                    Click to open
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Suggestions */}
        <section className="px-10 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Rentals 🚗",
              desc: "Book rentals for your journey",
              btn: "See more",
            },
            {
              title: "Reserve 📅",
              desc: "Schedule your ride in advance",
              btn: "Book Now",
            },
            {
              title: "Share your Ride 🚘",
              desc: "Save cost by carpooling",
              btn: "Share Now",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-gray-700 mb-4">{item.desc}</p>
              <button className="bg-[#17252A] text-white px-4 py-2 rounded-full text-sm hover:opacity-90 transition">
                {item.btn}
              </button>
            </div>
          ))}
        </section>

        {/* Login Prompt */}
        <section className="bg-white px-10 py-16 flex flex-col md:flex-row justify-between items-center gap-8 rounded-t-3xl shadow-inner">
          <div className="max-w-md">
            <h2 className="text-5xl font-bold mb-4">
              Log in to see your recent activity
            </h2>
            <p className="text-xl text-gray-600 mb-6">
              View your past rides, saved locations, and booking history.
            </p>
            <button className="bg-[#17252A] text-white px-6 py-2 rounded-full text-sm hover:opacity-90 transition">
              Login to CampusRide
            </button>
          </div>
          <img
            src={homeActivity}
            alt="App Preview"
            className="w-72 md:w-80 rounded-xl"
          />
        </section>

        {/* Plan & Benefits */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 px-10 py-20">
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="font-bold text-xl mb-3">Plan for later</h3>
            <p className="text-sm text-[#4b4b4b] mb-4">
              Get a ride when you need it, or plan ahead with reservations.
            </p>
            <button className="bg-[#17252A] text-white px-5 py-2 rounded-full text-sm hover:opacity-90 transition">
              Reserve
            </button>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="font-bold text-xl mb-3">Benefits</h3>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
              <li>Save money by sharing rides</li>
              <li>Easy access through our app</li>
              <li>Fast and secure bookings</li>
            </ul>
          </div>
        </section>

        {/* Driver Call to Action */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 px-10 py-20 items-center bg-[#f9fbfc]">
          <img
            src={Driver_image}
            alt="Driver"
            className="w-full rounded-xl shadow-md"
          />
          <div>
            <h2 className="text-5xl font-bold mb-4">
              Drive when you want, make what you need
            </h2>
            <p className="text-sm text-gray-700 mb-6">
              Make extra income by offering rides with CampusRide. Join our driver
              program today.
            </p>
            <button className="bg-[#17252A] text-white px-6 py-2 rounded-full text-sm hover:opacity-90 transition">
              Get Started
            </button>
          </div>
        </section>

        {/* Footer */}
        <CampusRideFooter />

        {/* --- Ride Creation Modals --- */}
        {/* Map Modal */}
        {showMapModal && (
          <>
            <div className="fixed inset-0 z-40 backdrop-blur-md bg-black/20"></div>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl relative overflow-hidden">
                {/* Header */}
                <div className="bg-black text-white px-6 py-4 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold">
                      {mapSelectionStep === "pickup" ? "📍 Select Pick-up Location" : "🎯 Select Drop-off Location"}
                    </h2>
                    <p className="text-gray-300 text-sm mt-1">
                      {mapSelectionStep === "pickup" 
                        ? "Click on the map to set your pick-up point" 
                        : "Click on the map to set your destination"}
                    </p>
                  </div>
                  <button
                    className="text-white hover:text-gray-300 text-2xl font-light transition-colors"
                    onClick={() => setShowMapModal(false)}
                  >
                    ✕
                  </button>
                </div>

                {/* Map Container */}
                <div className="w-full h-96 relative">
                  <GoogleMap
                    mapContainerStyle={{ width: "100%", height: "100%" }}
                    center={pickupCoord || userLocation || { lat: 23.7937, lng: 90.4066 }}
                    zoom={15}
                    onClick={handleMapModalClick}
                    options={{
                      zoomControl: true,
                      mapTypeControl: false,
                      scaleControl: true,
                      streetViewControl: false,
                      rotateControl: false,
                      fullscreenControl: false,
                    }}
                  >
                    {pickupCoord && (
                      <Marker 
                        position={pickupCoord} 
                        label={{
                          text: "P",
                          color: "white",
                          fontWeight: "bold"
                        }}
                        icon={{
                          url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="12" cy="12" r="10" fill="#3B82F6" stroke="white" stroke-width="2"/>
                              <text x="12" y="16" text-anchor="middle" fill="white" font-size="12" font-weight="bold">P</text>
                            </svg>
                          `),
                          scaledSize: new window.google.maps.Size(24, 24)
                        }}
                      />
                    )}
                    {dropoffCoord && (
                      <Marker 
                        position={dropoffCoord} 
                        label={{
                          text: "D",
                          color: "white",
                          fontWeight: "bold"
                        }}
                        icon={{
                          url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="12" cy="12" r="10" fill="#EF4444" stroke="white" stroke-width="2"/>
                              <text x="12" y="16" text-anchor="middle" fill="white" font-size="12" font-weight="bold">D</text>
                            </svg>
                          `),
                          scaledSize: new window.google.maps.Size(24, 24)
                        }}
                      />
                    )}
                  </GoogleMap>
                </div>

                {/* Footer */}
                <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Pick-up</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Drop-off</span>
                    </div>
                    {pickupCoord && dropoffCoord && distance && (
                      <div className="text-sm text-gray-600">
                        Distance: <span className="font-semibold text-black">{(distance / 1000).toFixed(2)} km</span>
                      </div>
                    )}
                  </div>
                  {pickupCoord && dropoffCoord && (
                    <button
                      className="bg-black text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors shadow-lg"
                      onClick={handleMapNext}
                    >
                      Next →
                    </button>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Schedule Modal */}
        {showScheduleModal && (
          <>
            <div className="fixed inset-0 z-40 backdrop-blur-md bg-black/20"></div>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] relative overflow-hidden flex flex-col">
                {/* Header */}
                <div className="bg-black text-white px-6 py-4 flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold">🚗 Schedule Your Ride</h2>
                    <button
                      className="text-white hover:text-gray-300 text-2xl font-light transition-colors"
                      onClick={() => setShowScheduleModal(false)}
                    >
                      ✕
                    </button>
                  </div>
                  <p className="text-gray-300 text-sm mt-1">
                    Choose when you'd like to take your ride
                  </p>
                </div>

                {/* Content - Scrollable */}
                <div className="p-6 overflow-y-auto flex-1">
                  {/* Schedule Type Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">When do you need the ride?</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        className={`p-4 rounded-xl border-2 transition-all ${
                          scheduleType === "now" 
                            ? "border-black bg-black text-white" 
                            : "border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-300"
                        }`}
                        onClick={() => setScheduleType("now")}
                      >
                        <div className="text-center">
                          <div className="text-2xl mb-2">⚡</div>
                          <div className="font-semibold">Now</div>
                          <div className="text-xs opacity-75">Immediate pickup</div>
                        </div>
                      </button>
                      <button
                        className={`p-4 rounded-xl border-2 transition-all ${
                          scheduleType === "future" 
                            ? "border-black bg-black text-white" 
                            : "border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-300"
                        }`}
                        onClick={() => setScheduleType("future")}
                      >
                        <div className="text-center">
                          <div className="text-2xl mb-2">📅</div>
                          <div className="font-semibold">Later</div>
                          <div className="text-xs opacity-75">Schedule for later</div>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Date and Time Selection */}
                  {scheduleType === "future" && (
                    <div className="space-y-4 mb-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">📅 Date</label>
                        <input
                          type="date"
                          className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors"
                          value={futureDate}
                          onChange={e => setFutureDate(e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">🕐 Time</label>
                        <input
                          type="time"
                          className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors"
                          value={futureTime}
                          onChange={e => setFutureTime(e.target.value)}
                        />
                      </div>
                    </div>
                  )}

                  {/* Ride Summary */}
                  <div className="bg-gray-50 rounded-xl p-4 mb-6">
                    <h3 className="font-semibold text-gray-800 mb-2">📍 Ride Summary</h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Pick-up:</span>
                        <span className="font-medium text-black">
                          {pickupCoord ? `${pickupCoord.lat.toFixed(4)}, ${pickupCoord.lng.toFixed(4)}` : 'Not selected'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Drop-off:</span>
                        <span className="font-medium text-black">
                          {dropoffCoord ? `${dropoffCoord.lat.toFixed(4)}, ${dropoffCoord.lng.toFixed(4)}` : 'Not selected'}
                        </span>
                      </div>
                      {distance && (
                        <div className="flex justify-between">
                          <span>Distance:</span>
                          <span className="font-medium text-black">{(distance / 1000).toFixed(2)} km</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>Schedule:</span>
                        <span className="font-medium text-black">
                          {scheduleType === "now" ? "Immediate" : `${futureDate} at ${futureTime}`}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer - Fixed at bottom */}
                <div className="p-6 flex-shrink-0 border-t border-gray-100">
                  <button
                    className={`w-full py-4 rounded-xl text-sm font-semibold transition-colors shadow-lg ${
                      scheduleType === "future" && (!futureDate || !futureTime)
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-black text-white hover:bg-gray-800"
                    }`}
                    onClick={handleScheduleSubmit}
                    disabled={scheduleType === "future" && (!futureDate || !futureTime)}
                  >
                    {scheduleType === "future" && (!futureDate || !futureTime)
                      ? "Please select date and time"
                      : "Confirm Ride Request"
                    }
                  </button>
                  {scheduleType === "future" && (!futureDate || !futureTime) && (
                    <p className="text-xs text-red-500 mt-2 text-center">
                      Please select both date and time to continue
                    </p>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
        {/* --- End Ride Creation Modals --- */}
      </div>
    </LoadScript>
  );
};

export default LandingPage;
