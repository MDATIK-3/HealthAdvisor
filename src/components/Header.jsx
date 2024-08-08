import { FaSun, FaMoon } from "react-icons/fa";

function Header({ setDarkMode, darkMode }) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">BMI Calculator</h1>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="text-lg border px-2 py-1 rounded"
      >
        {darkMode ? <FaSun /> : <FaMoon />}
      </button>
    </div>
  );
}

export default Header;
