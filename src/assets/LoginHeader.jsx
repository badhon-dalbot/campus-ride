import Logo from "./images/logo.png";
export default function LoginHeader() {
  return (
    <header className="bg-[#17252A] h-20 flex justify-center items-center overflow-visible">
      <img 
        src={logo} 
        alt="Campus Ride Logo" 
        className="h-51 object-contain mt-6" // or h-28, h-32 as needed
      />
    </header>
  );
}
