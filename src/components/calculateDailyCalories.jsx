export const calculateDailyCalories = (weight, height, age, activityLevel) => {
    let bmr = 10 * weight + 6.25 * (height * 100) - 5 * age;
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
  
    return calorieNeeds.toFixed(2);
  };
  