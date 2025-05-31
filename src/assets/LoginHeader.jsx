import Logo from "./images/logo.png";
export default function LoginHeader() {
  return (
    <header className="bg-gray-800 p-4 flex justify-center">
      <div className="flex items-center w-48">
        <img src={Logo} alt="Logo" />
      </div>
    </header>
  );
}
