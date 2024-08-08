function ShareButton({ bmi, category }) {
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

  return (
    <button
      onClick={shareResults}
      className="w-full bg-yellow-500 text-white py-2 rounded mt-4 hover:bg-yellow-600 transition-colors"
    >
      Share Results
    </button>
  );
}
export default ShareButton;
