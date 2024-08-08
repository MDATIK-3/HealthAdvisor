const UnitSelector = ({ units, setUnits, darkMode }) => (
  <div className="mb-4">
    <label htmlFor="units" className="block mb-2">
      Units:
    </label>
    <select
      id="units"
      value={units}
      onChange={(e) => setUnits(e.target.value)}
      className={`border rounded px-2 py-1 w-full ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <option value="metric">Metric (cm, kg)</option>
      <option value="imperial">Imperial (ft, in, kg)</option>
    </select>
  </div>
);

export default UnitSelector;
