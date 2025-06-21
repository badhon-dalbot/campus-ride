import logo from "../assets/images/campusRideLogo.png";

export default function LoginFooter() {
  return (
    <footer className="bg-[#17252A] w-full h-[70px] flex flex-start items-center overflow-hidden m-0 ">
      <img
        src={logo}
        alt="Campus Ride Logo"
        className="h-40 object-contain mt-7"
      />
    </footer>
  );
}
