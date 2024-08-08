const CalculateButton = ({ bmiCal }) => (
  <button
    onClick={bmiCal}
    className="w-full bg-blue-500 text-white py-2 rounded mt-4 hover:bg-blue-600 transition-colors"
  >
    Calculate BMI
  </button>
);

export default CalculateButton;
