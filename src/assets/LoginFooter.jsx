import logo from '../assets/images/campusRideLogo.png';

export default function Footer() {
  return (
    <footer className="bg-gray-800 w-full h-[60px] flex flex-start items-center overflow-hidden m-0">
      <img 
        src={logo} 
        alt="Campus Ride Logo" 
        className="h-[120px] object-contain"
      />
    </footer>
  );
}
