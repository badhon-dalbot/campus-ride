// routes/AppRoutes.jsx
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login.jsx';
import SignUp from '../pages/SignUp.jsx';
import Home from '../pages/Home.jsx';

// Comment out Login and Root unless you have them created
// import Root from '../pages/Root';

const AppRoutes = () => (
  <Routes>
    {/* Temporary home page to test routing */}
    <Route path="/" element={<Home/>} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<SignUp />} />
    

    {/* Comment out or remove these unless you define them */}
    {/* <Route path="/login" element={<Login />} /> */}
    {/* <Route path="/dashboard" element={<Dashboard />} /> */}
  </Routes>
);

export default AppRoutes;
