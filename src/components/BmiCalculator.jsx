import { calculateDailyCalories } from "./calculateDailyCalories";

const BmiCalculator = ({
  height,
  weight,
  age,
  heightInches,
  units,
  activityLevel,
  setBmi,
  setCategory,
  setError,
  setHistory,
  setDailyCalories,
  setBodyFat
}) => {

  const calculateBMI = () => {
    if (!height || !weight || !age || (units === "imperial" && !heightInches)) {
      setError("Please enter all required fields.");
      return;
    }

    setError("");
    let h = parseFloat(height);
    let w = parseFloat(weight);
    let h2 = parseFloat(heightInches) || 0;

    if (
      isNaN(h) ||
      isNaN(w) ||
      isNaN(age) ||
      (units === "imperial" && isNaN(h2))
    ) {
      setError("Please enter valid numbers.");
      return;
    }

    let heightInMeters;
    if (units === "metric") {
      heightInMeters = h / 100;
    } else {
      heightInMeters = (h * 12 + h2) * 0.0254;
    }

    const calculatedBmi = w / (heightInMeters * heightInMeters);
    setBmi(calculatedBmi.toFixed(2));
    determineCategory(calculatedBmi);
    updateHistory(calculatedBmi.toFixed(2));
    setDailyCalories(
      calculateDailyCalories(w, heightInMeters, age, activityLevel)
    );
    calculateBodyFat(calculatedBmi);
  };

  const determineCategory = (bmi) => {
    if (bmi < 18.5) setCategory("Underweight");
    else if (bmi >= 18.5 && bmi < 24.9) setCategory("Normal weight");
    else if (bmi >= 25 && bmi < 29.9) setCategory("Overweight");
    else setCategory("Obesity");
  };

  const updateHistory = (newBmi) => {
    const savedHistory = JSON.parse(localStorage.getItem("bmiHistory")) || [];
    const newHistory = [
      ...savedHistory,
      { id: uuidv4(), bmi: newBmi, date: new Date().toLocaleString() },
    ];
    setHistory(newHistory);
    localStorage.setItem("bmiHistory", JSON.stringify(newHistory));
  };

  const calculateBodyFat = (bmi) => {
    const bodyFat = 1.2 * bmi + 0.23 * 30 - 16.2;
    setBodyFat(bodyFat.toFixed(2));
  };

  return (
    <button onClick={calculateBMI} className="btn-calculate">
      Calculate BMI
    </button>
  );
};

export default BmiCalculator;
