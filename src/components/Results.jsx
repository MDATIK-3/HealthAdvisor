const Results = ({
  bmi,
  category,
  dailyCalories,
  bodyFat,
}) => (
  <div className="mt-6">
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
  </div>
);

export default Results;
