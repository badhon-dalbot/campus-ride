import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute.jsx";
import AboutUs from "../pages/AboutUs.jsx";
import AdminDashboard from "../pages/AdminDashboard.jsx";
import BookRide from "../pages/bookRide/BookRide.jsx";
import Chatting from "../pages/chat/chatting.jsx";
import ConfirmBooking from "../pages/ConfirmBooking.jsx";
import DriverDashboard from "../pages/DriverDashboard.jsx";
import DriverProfile from "../pages/driverprofile/DriverProfile.jsx";
import FindRide from "../pages/findRides/FindRide.jsx";
import HelpPage from "../pages/HelpCenter.jsx";
import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import Payment from "../pages/payment/payment.jsx";
import RideDetails from "../pages/RideDetails.jsx";
import RiderProfile from "../pages/riderprofile/RiderProfile.jsx";
import ShareRide from "../pages/ShareRide.jsx";
import SignUp from "../pages/SignUp.jsx";
import Offerings from "../pages/Offerings.jsx";
import Newsroom from "../pages/Newsroom.jsx";
import Investors from "../pages/Investors.jsx";
import Blog from "../pages/Blog.jsx";
import Careers from "../pages/Careers.jsx";
import Airports from "../pages/Airports.jsx";
import Universities from "../pages/Universities.jsx";
import College from "../pages/College.jsx";
import Cities from "../pages/Cities.jsx";

const AppRoutes = () => (
  <Routes>
    {/* Temporary home page to test routing */}
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/aboutus" element={<AboutUs />} />
    <Route path="/help" element={<HelpPage />} />
    <Route path="/offerings" element={<Offerings />} />
    <Route path="/newsroom" element={<Newsroom />} />
    <Route path="/investors" element={<Investors />} />
    <Route path="/blog" element={<Blog />} />
    <Route path="/careers" element={<Careers />} />
    <Route path="/airports" element={<Airports />} />
    <Route path="/universities" element={<Universities />} />
    <Route path="/college" element={<College />} />
    <Route path="/cities" element={<Cities />} />
    
    {/* Private Routes */}
    <Route
      path="/findride"
      element={
        <PrivateRoute>
          <FindRide />
        </PrivateRoute>
      }
    />
    <Route
      path="/shareride"
      element={
        <PrivateRoute>
          <ShareRide />
        </PrivateRoute>
      }
    />
    <Route
      path="/bookride/:rideId"
      element={
        <PrivateRoute>
          <BookRide />
        </PrivateRoute>
      }
    />
    <Route
      path="/ride-details"
      element={
        <PrivateRoute>
          <RideDetails />
        </PrivateRoute>
      }
    />
    <Route
      path="/conf-book"
      element={
        <PrivateRoute>
          <ConfirmBooking />
        </PrivateRoute>
      }
    />
    <Route
      path="/driverProfile"
      element={
        <PrivateRoute>
          <DriverProfile />
        </PrivateRoute>
      }
    />
    <Route
      path="/riderProfile"
      element={
        <PrivateRoute>
          <RiderProfile />
        </PrivateRoute>
      }
    />
    <Route
      path="/payment"
      element={
        <PrivateRoute>
          <Payment />
        </PrivateRoute>
      }
    />
    <Route
      path="/chatting"
      element={
        // <PrivateRoute>
        <Chatting />
        // </PrivateRoute>
      }
    />

    <Route
      path="/driverdash"
      element={
        <PrivateRoute>
          <DriverDashboard />
        </PrivateRoute>
      }
    />
    <Route
      path="/admindash"
      element={
        <PrivateRoute>
          <AdminDashboard />
        </PrivateRoute>
      }
    />
  </Routes>
);

export default AppRoutes;
