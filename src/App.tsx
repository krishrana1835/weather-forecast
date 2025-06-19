import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./Pages/Home";
import Search from "./Pages/Search";
import { useEffect, useState } from "react";
import { fetchWeather } from "./api/weatherApi";

interface Location {
  city: string;
  lat: number;
  lon: number;
}

function App() {
  const [location, setLocation] = useState<Location>({
    city: "Your City",
    lat:22.6890,
    lon:72.8610,
  });
  const [data, setData] = useState({});

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({
            city: "Your Location", 
            lat: latitude,
            lon: longitude,
          });
        },
        (error) => {
          console.warn("Geolocation permission denied or unavailable.", error);
        }
      );
    } else {
      console.warn("Geolocation is not supported by this browser.");
    }
  }, []);

  // Fetch weather data when location changes
  useEffect(() => {
    async function loadWeather() {
      try {
        const data = await fetchWeather({ lat: location.lat, lon: location.lon });
        setData(data);
      } catch (err) {
        console.error("Weather fetch failed:", err);
      }
    }

    loadWeather();
  }, [location]);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home data={data} location={location} />} />
        <Route path="/search" element={<Search setCity={setLocation} />} />
      </Routes>
    </>
  );
}

export default App;