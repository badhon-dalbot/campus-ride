import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login.jsx';
import SignUp from '../pages/SignUp.jsx';
import Home from '../pages/Home.jsx'
import FindRide from '../pages/findRides/FindRide.jsx'
import ShareRide from '../pages/ShareRide.jsx'
import BookRide from '../pages/bookRide/BookRide.jsx'
import RideDetails from '../pages/RideDetails.jsx';
import ConfirmBooking from '../pages/ConfirmBooking.jsx';
import DriverProfile from '../pages/driverprofile/DriverProfile.jsx';
import StudentProfile from '../pages/studentprofile/StudentProfile.jsx';
import Payment from '../pages/payment/payment.jsx';
import Chatting from '../pages/chat/chatting.jsx';
import AboutUs from '../pages/AboutUs.jsx';
import HelpPage from '../pages/HelpCenter.jsx';
import DriverDashboard from '../pages/DriverDashboard.jsx';
import AdminDashboard from '../pages/AdminDashboard.jsx';


const AppRoutes = () => (
  <Routes>
    {/* Temporary home page to test routing */}
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/findride" element={<FindRide/>}/>
    <Route path="/shareride" element={<ShareRide/>}/>
    <Route path="/bookride" element={<BookRide/>}/>
    <Route path="/ride-details" element={<RideDetails/>}/>
    <Route path="/conf-book" element={<ConfirmBooking/>}/>
    <Route path="/driverProfile" element={<DriverProfile/>}/>
    <Route path="/studentProfile" element={<StudentProfile/>}/>
    <Route path="/payment" element={<Payment/>}/>
    <Route path="/chatting" element={<Chatting/>}/>
    <Route path="/aboutus" element = {<AboutUs/>}/>
    <Route path="/help" element={<HelpPage />} />
    <Route path="/driverdash" element={<DriverDashboard/>}/>
    <Route path="/admindash" element={<AdminDashboard/>}/>

  </Routes>
);

export default AppRoutes;
