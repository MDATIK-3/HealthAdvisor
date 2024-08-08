import { useState, useEffect } from "react";
import ErrorMessage from "./ErrorMessage";

const Location = ({ setHealthAdvice, healthAdvice }) => {
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          )
            .then((response) => response.json())
            .then((data) => {
              const country = data.countryName;
              setLocation(`${data.city}, ${country}`);
              getHealthAdvice(country);
            })
            .catch(() => {
              setError("Error fetching location data.");
            });
        });
      } else {
        setError("Geolocation is not supported by this browser.");
      }
    };

    fetchLocation();
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

  return (
    <div>
      {error && <ErrorMessage error={error} />}
      {location && (
        <div className="mt-6">
          <h2 className="text-xl font-bold text-center">
            Location: {location}
          </h2>
          <p className="text-center">{healthAdvice}</p>
        </div>
      )}
    </div>
  );
};

export default Location;
