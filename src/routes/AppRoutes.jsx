import { Routes, Route } from 'react-router-dom';
import Login from '../pages/LogIn.jsx';
import SignUp from '../pages/SignUp.jsx';
import LandingPage from '../pages/LandingPage.jsx'
import FindRide from '../pages/FindRide.jsx'
import ShareRide from '../pages/ShareRide.jsx'
import BookRide from '../pages/BookRide.jsx'
import RideDetails from '../pages/RideDetails.jsx';
import ConfirmBooking from '../pages/ConfirmBooking.jsx';
import DriverProfile from '../pages/DriverProfile.jsx';


// Comment out Login and Root unless you have them created
// import Login from '../pages/Login';
// import Root from '../pages/Root';

const AppRoutes = () => (
  <Routes>
    {/* Temporary home page to test routing */}
    <Route path="/" element={<h1>Home Page</h1>} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/landing" element={<LandingPage/>}/>
    <Route path="/findride" element={<FindRide/>}/>
    <Route path="/shareride" element={<ShareRide/>}/>
    <Route path="/bookride" element={<BookRide/>}/>
    <Route path="/ride-details" element={<RideDetails/>}/>
    <Route path="/conf-book" element={<ConfirmBooking/>}/>
    <Route path="/driverProfile" element={<DriverProfile/>}/>
    
    

    {/* Comment out or remove these unless you define them */}
    {/* <Route path="/login" element={<Login />} /> */}
    {/* <Route path="/dashboard" element={<Dashboard />} /> */}
  </Routes>
);

export default AppRoutes;
