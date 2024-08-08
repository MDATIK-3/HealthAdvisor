import { FaUserAlt } from "react-icons/fa";

function UserDetailsInput({ age, setAge, darkMode }) {
    
  return (
    <div className="mb-4">
    <label htmlFor="age" className="block mb-2">
      Age:
    </label>
    <div className="relative">
      <FaUserAlt className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <input
        id="age"
        type="text"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        className={`border rounded pl-8 py-1 w-full ${
          darkMode ? "bg-gray-800 text-white border-gray-600 custom-focus" : "bg-white text-black border-gray-300 custom-focus"
        } focus:outline-none`}
      />
    </div>
  </div>
  );
}

export default UserDetailsInput;
