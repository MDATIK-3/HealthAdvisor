import { useState, useEffect } from "react";
import "chart.js/auto";
import { v4 as uuidv4 } from "uuid";
import { FaRulerVertical, FaWeight } from "react-icons/fa";
import ErrorMessage from "./components/ErrorMessage";
import UnitSelector from "./components/UnitSelector";
import HeightInput from "./components/HeightInput";
import WeightInput from "./components/WeightInput";
import UserDetailsInput from "./components/UserDetailsInput";
import ActivityLevelSelector from "./components/ActivityLevelSelector";
import CalculateButton from "./components/CalculateButton";
import Results from "./components/Results";
import BmiHistory from "./components/BmiHistory/BmiHistory";
import ShareButton from "./components/ShareButton";
import Header from "./components/Header";
import Location from "./components/Location";
import { calculateDailyCalories } from "./components/calculateDailyCalories";

export default function App() {
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");
  const [units, setUnits] = useState("metric");
  const [history, setHistory] = useState("");
  const [height, setHeight] = useState("");
  const [heightInches, setHeightInches] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [activityLevel, setActivityLevel] = useState("sedentary");
  const [darkMode, setDarkMode] = useState(false);
  const [error, setError] = useState("");
  const [dailyCalories, setDailyCalories] = useState(null);
  const [bodyFat, setBodyFat] = useState(null);
  const [healthAdvice, setHealthAdvice] = useState("");

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("bmiHistory")) || [];
    setHistory(savedHistory);
  }, []);

  const bmiCal = () => {
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
    calculateBodyFat(calculatedBmi, heightInMeters, w);
  };

  const determineCategory = (bmi) => {
    if (bmi < 18.5) setCategory("Underweight");
    else if (bmi >= 18.5 && bmi < 24.9) setCategory("Normal weight");
    else if (bmi >= 25 && bmi < 29.9) setCategory("Overweight");
    else setCategory("Obesity");
  };

  const updateHistory = (newBmi) => {
    const newHistory = [
      ...history,
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
    <div
      className={`min-h-screen flex items-center justify-center p-4 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <div
        className={`p-6 rounded-lg shadow-md w-full max-w-lg ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <Header setDarkMode={setDarkMode} darkMode={darkMode} />

        {error && <ErrorMessage error={error} />}

        <UnitSelector units={units} setUnits={setUnits} darkMode={darkMode} />

        <HeightInput
          units={units}
          height={height}
          heightInches={heightInches}
          setHeight={setHeight}
          setHeightInches={setHeightInches}
          FaRulerVertical={FaRulerVertical}
          darkMode={darkMode}
        />

        <WeightInput
          weight={weight}
          setWeight={setWeight}
          FaWeight={FaWeight}
          darkMode={darkMode}
        />

        <UserDetailsInput age={age} setAge={setAge} darkMode={darkMode} />

        <ActivityLevelSelector
          activityLevel={activityLevel}
          setActivityLevel={setActivityLevel}
          darkMode={darkMode}
        />

        <CalculateButton bmiCal={bmiCal} />

        <Results
          bmi={bmi}
          category={category}
          dailyCalories={dailyCalories}
          bodyFat={bodyFat}
        />

        {history.length > 0 && (
          <BmiHistory history={history} setHistory={setHistory} />
        )}

        <Location
          setHealthAdvice={setHealthAdvice}
          healthAdvice={healthAdvice}
        />

        <ShareButton bmi={bmi} category={category} />
      </div>
    </div>
  );
}
