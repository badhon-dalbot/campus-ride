import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
} from "@react-google-maps/api";
import { useCallback, useEffect, useRef, useState } from "react";
import Driver_image from "../assets/images/Driver_image.png";
import homeActivity from "../assets/images/home_activity.png";
import CampusRideFooter from "../components/CampusRideFooter";
import CampusRideHeader from "../components/CampusRideHeader";

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

  return (
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
            />
            <input
              type="text"
              placeholder="Drop-off Location"
              className="w-full p-3 border rounded-lg text-sm"
            />
            <div className="flex justify-between items-center pt-2">
              <button className="bg-[#17252A] text-white px-6 py-2 rounded-full text-sm hover:opacity-90 transition">
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
              <LoadScript
                googleMapsApiKey="AIzaSyBOG7IFo26OQPV4lPHQweWDhxp_xLSMpSw"
                onError={onError}
              >
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
              </LoadScript>
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
    </div>
  );
};

export default LandingPage;
