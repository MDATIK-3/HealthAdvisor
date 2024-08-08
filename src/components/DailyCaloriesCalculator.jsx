import { useEffect, useState } from 'react';

const DailyCaloriesCalculator = ({ weight, height, age, activityLevel, setDailyCalories }) => {
  const [calorieNeeds, setCalorieNeeds] = useState(null);

  useEffect(() => {
    const calculateDailyCalories = () => {
      let bmr = 10 * weight + 6.25 * (height * 100) - 5 * age;
      let calories;

      switch (activityLevel) {
        case 'sedentary':
          calories = bmr * 1.2;
          break;
        case 'light':
          calories = bmr * 1.375;
          break;
        case 'moderate':
          calories = bmr * 1.55;
          break;
        case 'active':
          calories = bmr * 1.725;
          break;
        case 'very active':
          calories = bmr * 1.9;
          break;
        default:
          calories = bmr * 1.2;
      }

      setCalorieNeeds(calories.toFixed(2));
      setDailyCalories(calories.toFixed(2));
    };

    if (weight && height && age) {
      calculateDailyCalories();
    }
  }, [weight, height, age, activityLevel, setDailyCalories]);

  return (
    <div className="mt-6">
      {calorieNeeds && (
        <h2 className="text-xl font-bold text-center">
          Daily Caloric Needs: {calorieNeeds} kcal
        </h2>
      )}
    </div>
  );
};

export default DailyCaloriesCalculator;
