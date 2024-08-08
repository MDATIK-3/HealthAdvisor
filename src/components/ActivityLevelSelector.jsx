const ActivityLevelSelector = ({ activityLevel, setActivityLevel, darkMode}) => (
  <div className="mt-4">
    <label className="block text-lg font-medium mb-2">Activity Level</label>
    <select
      value={activityLevel}
      onChange={(e) => setActivityLevel(e.target.value)}
      className={`border rounded px-2 py-1 w-full ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <option value="sedentary">Sedentary</option>
      <option value="light">Light</option>
      <option value="moderate">Moderate</option>
      <option value="active">Active</option>
      <option value="very active">Very Active</option>
    </select>
  </div>
);

export default ActivityLevelSelector;
