// routes/AppRoutes.jsx
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/LogIn.jsx';
import SignUp from '../pages/SignUp.jsx';
import LandingPage from '../pages/LandingPage.jsx'

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
    

    {/* Comment out or remove these unless you define them */}
    {/* <Route path="/login" element={<Login />} /> */}
    {/* <Route path="/dashboard" element={<Dashboard />} /> */}
  </Routes>
);

export default AppRoutes;
