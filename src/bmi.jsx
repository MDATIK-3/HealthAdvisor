import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { v4 as uuidv4 } from "uuid";
import {
  FaSun,
  FaMoon,
  FaRulerVertical,
  FaWeight,
  FaUserAlt,
} from "react-icons/fa";

export default function Bmi() {
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");
  const [history, setHistory] = useState([]);
  const [units, setUnits] = useState("metric");
  const [height, setHeight] = useState("");
  const [heightInches, setHeightInches] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [activityLevel, setActivityLevel] = useState("sedentary");
  const [darkMode, setDarkMode] = useState(false);
  const [error, setError] = useState("");
  const [dailyCalories, setDailyCalories] = useState(null);
  const [bodyFat, setBodyFat] = useState(null);
  const [location, setLocation] = useState("");
  const [country, setCountry] = useState("");
  const [healthAdvice, setHealthAdvice] = useState("");

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("bmiHistory")) || [];
    setHistory(savedHistory);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`
        )
          .then((response) => response.json())
          .then((data) => {
            setLocation(`${data.city}, ${data.countryName}`);
            setCountry(data.countryName);
            getHealthAdvice(data.countryName);
          });
      });
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  const getHealthAdvice = (country) => {
    const advice = {
      USA: "In the USA, a balanced diet and regular exercise are recommended.",
      India:
        "In India, it's important to include yoga and a diet rich in spices.",
    };
    setHealthAdvice(
      advice[country] ||
        "General health advice: Stay active and eat a balanced diet."
    );
  };

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
    calculateDailyCalories(w, heightInMeters, age);
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

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("bmiHistory");
  };

  const calculateDailyCalories = (weight, height, age) => {
    let bmr;
    if (units === "metric") {
      bmr = 10 * weight + 6.25 * (height * 100) - 5 * age;
    } else {
      bmr = 10 * (weight / 2.205) + 6.25 * (height * 100) - 5 * age;
    }

    let calorieNeeds;
    switch (activityLevel) {
      case "sedentary":
        calorieNeeds = bmr * 1.2;
        break;
      case "light":
        calorieNeeds = bmr * 1.375;
        break;
      case "moderate":
        calorieNeeds = bmr * 1.55;
        break;
      case "active":
        calorieNeeds = bmr * 1.725;
        break;
      case "very active":
        calorieNeeds = bmr * 1.9;
        break;
      default:
        calorieNeeds = bmr * 1.2;
    }

    setDailyCalories(calorieNeeds.toFixed(2));
  };

  const calculateBodyFat = (bmi, height, weight) => {
    const bodyFat = 1.2 * bmi + 0.23 * 30 - 16.2; // Assuming age as 30 for simplicity
    setBodyFat(bodyFat.toFixed(2));
  };

  const shareResults = () => {
    const shareText = `My current BMI is ${bmi}, categorized as ${category}. You can calculate your BMI too!`;
    if (navigator.share) {
      navigator.share({
        title: "BMI Calculator Results",
        text: shareText,
        url: window.location.href,
      });
    } else {
      alert("Share feature is not supported in your browser.");
    }
  };

  const chartData = {
    labels: history.map((entry) => entry.date),
    datasets: [
      {
        label: "BMI History",
        data: history.map((entry) => entry.bmi),
        borderColor: "rgba(75,192,192,1)",
        fill: false,
      },
    ],
  };

  const exportHistory = () => {
    const csvRows = [
      ["ID", "BMI", "Date"],
      ...history.map((entry) => [entry.id, entry.bmi, entry.date]),
    ];

    const csvContent =
      "data:text/csv;charset=utf-8," +
      csvRows.map((row) => row.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "bmi_history.csv");
    document.body.appendChild(link);
    link.click();
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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">BMI Calculator</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-lg border px-2 py-1 rounded"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="mb-4">
          <label htmlFor="units" className="block mb-2">
            Units:
          </label>
          <select
            id="units"
            value={units}
            onChange={(e) => setUnits(e.target.value)}
            className="border rounded px-2 py-1 w-full"
          >
            <option value="metric">Metric (cm, kg)</option>
            <option value="imperial">Imperial (ft, in, lbs)</option>
          </select>
        </div>

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
                className="border rounded pl-8 py-1 w-full"
              />
            </div>
            {units === "imperial" && (
              <div className="relative w-full ml-2">
                <input
                  type="text"
                  placeholder="Inches"
                  value={heightInches}
                  onChange={(e) => setHeightInches(e.target.value)}
                  className="border rounded px-2 py-1 w-full"
                />
              </div>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="weight" className="block mb-2">
            Weight:
          </label>
          <div className="relative">
            <FaWeight className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              id="weight"
              type="text"
              placeholder={units === "metric" ? "Weight (kg)" : "Weight (lbs)"}
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="border rounded pl-8 py-1 w-full"
            />
          </div>
        </div>

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
              className="border rounded pl-8 py-1 w-full"
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="activity" className="block mb-2">
            Activity Level:
          </label>
          <select
            id="activity"
            value={activityLevel}
            onChange={(e) => setActivityLevel(e.target.value)}
            className="border rounded px-2 py-1 w-full"
          >
            <option value="sedentary">Sedentary</option>
            <option value="light">Light Activity</option>
            <option value="moderate">Moderate Activity</option>
            <option value="active">Active</option>
            <option value="very active">Very Active</option>
          </select>
        </div>

        <button
          onClick={bmiCal}
          className="w-full bg-blue-500 text-white py-2 rounded mt-4 hover:bg-blue-600 transition-colors"
        >
          Calculate BMI
        </button>

        {bmi && (
          <div className="mt-6">
            <h2 className="text-xl font-bold text-center">BMI: {bmi}</h2>
            <p className="text-center">{category}</p>
          </div>
        )}

        {dailyCalories && (
          <div className="mt-6">
            <h2 className="text-xl font-bold text-center">
              Daily Caloric Needs: {dailyCalories} kcal
            </h2>
          </div>
        )}

        {bodyFat && (
          <div className="mt-6">
            <h2 className="text-xl font-bold text-center">
              Estimated Body Fat: {bodyFat}%
            </h2>
          </div>
        )}

        {history.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-bold text-center">BMI History</h2>
            <Line data={chartData} />
            <button
              onClick={clearHistory}
              className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition-colors"
            >
              Clear History
            </button>
            <button
              onClick={exportHistory}
              className="mt-2 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-colors"
            >
              Export History
            </button>
          </div>
        )}

        {location && (
          <div className="mt-6">
            <h2 className="text-xl font-bold text-center">
              Location: {location}
            </h2>
            <p className="text-center">{healthAdvice}</p>
          </div>
        )}

        <button
          onClick={shareResults}
          className="w-full bg-yellow-500 text-white py-2 rounded mt-4 hover:bg-yellow-600 transition-colors"
        >
          Share Results
        </button>
      </div>
    </div>
  );
}
