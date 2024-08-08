import { FaRulerVertical } from "react-icons/fa";

function HeightInput({
  units,
  height,
  setHeight,
  heightInches,
  setHeightInches,
  darkMode,
}) {
  return (
    <div className="mb-4">
      <label htmlFor="height" className="block mb-2">
        Height:
      </label>
      <div className="flex">
        <div className="relative w-full">
          <FaRulerVertical className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            id="height"
            type="text"
            placeholder={units === "metric" ? "Height (cm)" : "Feet"}
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className={`border rounded pl-8 py-1 w-full ${
              darkMode ? "bg-gray-800 text-white border-gray-600 custom-focus" : "bg-white text-black border-gray-300 custom-focus"
            } focus:outline-none`}
          />
        </div>
        {units === "imperial" && (
          <div className="relative w-full ml-2">
            <input
              type="text"
              placeholder="Inches"
              value={heightInches}
              onChange={(e) => setHeightInches(e.target.value)}
              className={`border rounded px-2 py-1 w-full ${
                darkMode ? "bg-gray-800 text-white border-gray-600 custom-focus" : "bg-white text-black border-gray-300 custom-focus"
              } focus:outline-none`}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default HeightInput;
