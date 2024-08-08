const WeightInput = ({ weight, setWeight, units, FaWeight, darkMode }) => (
    <div className="mb-4">
    <label htmlFor="weight" className="block mb-2">
      Weight:
    </label>
    <div className="relative">
      <FaWeight className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <input
        id="weight"
        type="text"
        placeholder={units === "metric" ? "Weight (kg)" : "Weight (kg)"}
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        className={`border rounded pl-8 py-1 w-full ${
          darkMode ? "bg-gray-800 text-white border-gray-600 custom-focus" : "bg-white text-black border-gray-300 custom-focus"
        } focus:outline-none`}
      />
    </div>
  </div>
  );
  
  export default WeightInput;
  