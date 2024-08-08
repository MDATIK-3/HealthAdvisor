const ChartData = ({ history }) => {
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
  
    return chartData;
  };
  
  export default ChartData;
  