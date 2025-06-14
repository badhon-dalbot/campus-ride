import Logo from "./images/logo.png";
export default function LoginHeader() {
  return (
    <header className="bg-[#17252A] h-20 flex justify-center items-center overflow-visible">
      <img 
        src={Logo} 
        alt="Campus Ride Logo" 
        className="h-14 object-contain mt-4"
      />
    </header>
  );
}
