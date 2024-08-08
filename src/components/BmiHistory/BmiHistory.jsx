import ExportHistory from "./ExportHistory";
import ChartData from "./CharData";
import { Line } from "react-chartjs-2";

function BmiHistory({ history, setHistory }) {
  const exportHistory = ExportHistory({ history });
  const chartData = ChartData({ history });
  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("bmiHistory");
  };

  return (
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
  );
}

export default BmiHistory;
