import logo from '../assets/images/campusRideLogo.png';

export default function LoginHeader() {
  return (
    <header className="bg-gray-800 p-2 flex justify-center items-center h-20">
      <img 
        src={logo} 
        alt="Campus Ride Logo" 
        className="w-45 object-contain"
      />
    </header>
  );
}
