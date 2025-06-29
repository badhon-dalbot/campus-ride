import { Calendar, Clock, DollarSign, MapPin, Users, X, ArrowRight } from "lucide-react";
import { useState, useCallback } from "react";
import {
  GoogleMap,
  Marker,
} from "@react-google-maps/api";
import { createRide } from "../../services/driverAPI";
import { useAuth } from "../../components/AuthContext";

export default function OfferRideModal({ isOpen, onClose, onRideCreated }) {
  const { user, isLoggedIn } = useAuth(); // Use AuthContext instead of localStorage
  const [currentStep, setCurrentStep] = useState("form"); // "form", "map", "details"
  const [form, setForm] = useState({
    from: "",
    to: "",
    date: "",
    time: "",
    seats: 1,
    price: "",
    pickup_description: "",
    notes: "",
  });
  const [pickupCoord, setPickupCoord] = useState(null);
  const [dropoffCoord, setDropoffCoord] = useState(null);
  const [mapSelectionStep, setMapSelectionStep] = useState("pickup"); // "pickup" or "dropoff"
  const [distance, setDistance] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Calculate distance between two points using Haversine formula
  const calculateDistance = (point1, point2) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (point2.lat - point1.lat) * Math.PI / 180;
    const dLon = (point2.lng - point1.lng) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(point1.lat * Math.PI / 180) * Math.cos(point2.lat * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c; // Distance in kilometers
    return distance * 1000; // Convert to meters
  };

  // Handle map click for location selection
  const handleMapClick = async (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    
    if (mapSelectionStep === "pickup") {
      setPickupCoord({ lat, lng });
      setMapSelectionStep("dropoff");
      console.log("Pickup location selected:", { lat, lng });
    } else if (mapSelectionStep === "dropoff") {
      setDropoffCoord({ lat, lng });
      // Calculate distance
      if (pickupCoord) {
        const dist = calculateDistance(pickupCoord, { lat, lng });
        setDistance(dist);
        console.log("Dropoff location selected:", { lat, lng });
        console.log("Distance:", (dist / 1000).toFixed(2), "km");
      }
    }
  };

  // Handle form submission to move to map selection
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setError(null);
    
    if (!form.from.trim() || !form.to.trim()) {
      setError("Please enter both pickup and dropoff locations");
      return;
    }
    setCurrentStep("map");
    setPickupCoord(null);
    setDropoffCoord(null);
    setMapSelectionStep("pickup");
    setDistance(null);
  };

  // Handle map next button
  const handleMapNext = () => {
    setError(null);
    
    if (!pickupCoord || !dropoffCoord) {
      setError("Please select both pickup and dropoff locations on the map");
      return;
    }
    setCurrentStep("details");
  };

  // Handle final submission
  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    
    // Check if user is logged in using AuthContext
    if (!isLoggedIn || !user || !user.user || !user.user.id) {
      setError("Please log in to offer a ride");
      setIsSubmitting(false);
      return;
    }

    const rideData = {
      creator_id: user.user.id,
      creator_role: "driver",
      from_location: form.from,
      to_location: form.to,
      ride_date: form.date,
      ride_time: form.time + ":00", // Add seconds
      seats_available: form.seats,
      price_per_seat: parseFloat(form.price),
      pickup_description: form.pickup_description,
      notes: form.notes,
      pickup_coordinate: pickupCoord ? `${pickupCoord.lat},${pickupCoord.lng}` : null,
      dropoff_coordinate: dropoffCoord ? `${dropoffCoord.lat},${dropoffCoord.lng}` : null,
      distance: distance,
      seats_needed: form.seats,
      is_shared: "yes"
    };

    try {
      console.log("Creating ride:", rideData);
      
      // Call the API to create the ride
      const response = await createRide(rideData);
      console.log("Ride created successfully:", response);
      
      // Close the modal
      onClose();
      
      // Reset form
      setForm({
        from: "",
        to: "",
        date: "",
        time: "",
        seats: 1,
        price: "",
        pickup_description: "",
        notes: "",
      });
      setPickupCoord(null);
      setDropoffCoord(null);
      setDistance(null);
      setCurrentStep("form");
      setMapSelectionStep("pickup");
      setError(null);
      
      // Optionally refresh the dashboard data
      if (onRideCreated) {
        onRideCreated(response);
      }
    } catch (error) {
      console.error("Error creating ride:", error);
      setError(error.response?.data?.error || "Failed to create ride. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle back button
  const handleBack = () => {
    if (currentStep === "map") {
      setCurrentStep("form");
    } else if (currentStep === "details") {
      setCurrentStep("map");
    }
  };

  // Handle close
  const handleClose = () => {
    setCurrentStep("form");
    setPickupCoord(null);
    setDropoffCoord(null);
    setDistance(null);
    setMapSelectionStep("pickup");
    setError(null);
    setIsSubmitting(false);
    onClose();
  };

  if (!isOpen) return null;

  // Map configuration
  const mapContainerStyle = {
    width: "100%",
    height: "400px"
  };

  const center = {
    lat: 23.7937, // Dhaka coordinates
    lng: 90.4066
  };

  return (
    <>
      <div className="fixed inset-0 z-40 backdrop-blur-md bg-black/20"></div>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] relative overflow-hidden flex flex-col">
          
          {/* Header */}
          <div className="bg-night-ink text-white px-6 py-4 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">
                  {currentStep === "form" && "🚗 Offer a Ride"}
                  {currentStep === "map" && "📍 Select Locations"}
                  {currentStep === "details" && "📋 Ride Details"}
                </h2>
                <p className="text-gray-300 text-sm mt-1">
                  {currentStep === "form" && "Enter basic ride information"}
                  {currentStep === "map" && "Click on the map to set pickup and dropoff points"}
                  {currentStep === "details" && "Review and confirm your ride details"}
                </p>
              </div>
              <button
                onClick={handleClose}
                className="text-white hover:text-gray-300 text-2xl font-light transition-colors"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Content - Scrollable */}
          <div className="p-6 overflow-y-auto flex-1">
            
            {/* Error Display */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}
            
            {/* Step 1: Basic Form */}
            {currentStep === "form" && (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Pickup Location
                    </label>
                    <div className="flex items-center border border-gray-300 rounded px-3 py-2">
                      <MapPin className="w-4 h-4 text-gray-500 mr-2" />
                      <input
                        type="text"
                        name="from"
                        value={form.from}
                        onChange={handleChange}
                        placeholder="e.g. Downtown"
                        className="w-full text-sm outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Drop-off Location
                    </label>
                    <div className="flex items-center border border-gray-300 rounded px-3 py-2">
                      <MapPin className="w-4 h-4 text-gray-500 mr-2" />
                      <input
                        type="text"
                        name="to"
                        value={form.to}
                        onChange={handleChange}
                        placeholder="e.g. North Campus"
                        className="w-full text-sm outline-none"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Date</label>
                    <div className="flex items-center border border-gray-300 rounded px-3 py-2">
                      <Calendar className="w-4 h-4 text-gray-500 mr-2" />
                      <input
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                        className="w-full text-sm outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Time</label>
                    <div className="flex items-center border border-gray-300 rounded px-3 py-2">
                      <Clock className="w-4 h-4 text-gray-500 mr-2" />
                      <input
                        type="time"
                        name="time"
                        value={form.time}
                        onChange={handleChange}
                        className="w-full text-sm outline-none"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Seats Available
                    </label>
                    <div className="flex items-center border border-gray-300 rounded px-3 py-2">
                      <Users className="w-4 h-4 text-gray-500 mr-2" />
                      <input
                        type="number"
                        name="seats"
                        value={form.seats}
                        onChange={handleChange}
                        min={1}
                        max={8}
                        className="w-full text-sm outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Price per Seat ($)
                    </label>
                    <div className="flex items-center border border-gray-300 rounded px-3 py-2">
                      <DollarSign className="w-4 h-4 text-gray-500 mr-2" />
                      <input
                        type="number"
                        name="price"
                        value={form.price}
                        onChange={handleChange}
                        min={1}
                        step={0.01}
                        className="w-full text-sm outline-none"
                        required
                      />
                    </div>
                  </div>
                </div>
              </form>
            )}

            {/* Step 2: Map Selection */}
            {currentStep === "map" && (
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-3 h-3 rounded-full ${mapSelectionStep === "pickup" ? "bg-blue-500" : "bg-gray-300"}`}></div>
                    <span className="font-medium">
                      {mapSelectionStep === "pickup" ? "📍 Select Pickup Location" : "✅ Pickup Selected"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${mapSelectionStep === "dropoff" ? "bg-blue-500" : "bg-gray-300"}`}></div>
                    <span className="font-medium">
                      {mapSelectionStep === "dropoff" ? "🎯 Select Dropoff Location" : "✅ Dropoff Selected"}
                    </span>
                  </div>
                </div>

                {!import.meta.env.VITE_GOOGLE_MAPS_API_KEY ? (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-800 text-sm">
                      <strong>Google Maps API Key Missing:</strong> Please add your Google Maps API key to the .env file as VITE_GOOGLE_MAPS_API_KEY
                    </p>
                  </div>
                ) : (
                  <div className="w-full h-96 relative">
                    {/* Check if Google Maps is loaded globally */}
                    {window.google && window.google.maps ? (
                      <GoogleMap
                        mapContainerStyle={{ width: "100%", height: "100%" }}
                        center={center}
                        zoom={12}
                        onClick={handleMapClick}
                        onLoad={() => setMapLoaded(true)}
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
                    ) : (
                      <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-700 mx-auto mb-2"></div>
                          <p className="text-gray-600">Loading Google Maps...</p>
                          <p className="text-xs text-gray-500 mt-1">
                            If this takes too long, please refresh the page
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {distance && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-sm text-green-800">
                      <strong>Distance:</strong> {(distance / 1000).toFixed(2)} km
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Final Details */}
            {currentStep === "details" && (
              <form onSubmit={handleFinalSubmit} className="space-y-6">
                {/* Ride Summary */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-800 mb-3">📍 Ride Summary</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Pickup:</span>
                      <p className="font-medium">{form.from}</p>
                      {pickupCoord && (
                        <p className="text-xs text-gray-500">
                          {pickupCoord.lat.toFixed(4)}, {pickupCoord.lng.toFixed(4)}
                        </p>
                      )}
                    </div>
                    <div>
                      <span className="text-gray-600">Dropoff:</span>
                      <p className="font-medium">{form.to}</p>
                      {dropoffCoord && (
                        <p className="text-xs text-gray-500">
                          {dropoffCoord.lat.toFixed(4)}, {dropoffCoord.lng.toFixed(4)}
                        </p>
                      )}
                    </div>
                    <div>
                      <span className="text-gray-600">Date & Time:</span>
                      <p className="font-medium">{form.date} at {form.time}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Distance:</span>
                      <p className="font-medium">{distance ? `${(distance / 1000).toFixed(2)} km` : 'N/A'}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Seats:</span>
                      <p className="font-medium">{form.seats} available</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Price:</span>
                      <p className="font-medium">${form.price} per seat</p>
                    </div>
                  </div>
                </div>

                {/* Additional Details */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Pickup Description
                    </label>
                    <textarea
                      name="pickup_description"
                      value={form.pickup_description}
                      onChange={handleChange}
                      placeholder="e.g. Meet at the main entrance, near the fountain"
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none resize-none"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Additional Notes
                    </label>
                    <textarea
                      name="notes"
                      value={form.notes}
                      onChange={handleChange}
                      placeholder="e.g. No smoking, music allowed, flexible timing"
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none resize-none"
                      rows={3}
                    />
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* Footer - Fixed at bottom */}
          <div className="p-6 flex-shrink-0 border-t border-gray-100">
            {currentStep === "form" && (
              <button
                onClick={handleFormSubmit}
                className="w-full bg-night-ink text-white py-3 rounded-lg text-sm font-medium hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2"
              >
                Next: Select Locations on Map
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            {currentStep === "map" && (
              <div className="flex gap-3">
                <button
                  onClick={handleBack}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleMapNext}
                  disabled={!pickupCoord || !dropoffCoord}
                  className="flex-1 bg-night-ink text-white py-3 rounded-lg text-sm font-medium hover:bg-opacity-90 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  Next: Review Details
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {currentStep === "details" && (
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={isSubmitting}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleFinalSubmit}
                  disabled={isSubmitting}
                  className="flex-1 bg-night-ink text-white py-3 rounded-lg text-sm font-medium hover:bg-opacity-90 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Creating Ride...
                    </>
                  ) : (
                    "Create Ride"
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
