import { useEffect, useState } from "react";
import { fetchSimpleForecast } from "../api/weatherApi";

interface RowData {
  day: string;
  weather: string;
  num1: number;
  num2: number;
}

function formatWeatherCode(code: string): string {
  const map: Record<string, string> = {
    clear: "Clear",
    clearsky: "Clear",
    fair: "Clear",
    partlycloudy: "Clouds",
    cloudy: "Clouds",
    fog: "Fog",
    mist: "Mist",
    drizzle: "Drizzle",
    lightrain: "Drizzle",
    rain: "Rain",
    heavyrain: "Rain",
    showers: "Rain",
    rainshowers: "Rain",
    freezingrain: "Rain",
    freezingdrizzle: "Rain",
    rainandthunder: "Thunderstorm",
    thunder: "Thunderstorm",
    snow: "Snow",
    sleet: "Snow",
    lightsnowshowersandthunder: "Snow",
    lightssnowshowersandthunder: "Snow",
    smoke: "Smoke",
    haze: "Haze",
    dust: "Dust",
    sand: "Sand",
    ash: "Ash",
    squall: "Squall",
    tornado: "Tornado",
  };

  const normalizedCode = code.toLowerCase().replace(/_(day|night)$/, "");
  return map[normalizedCode] ?? (code.charAt(0).toUpperCase() + code.slice(1).toLowerCase());
}

function RowComponent({ day, weather, num1, num2 }: RowData) {
  return (
    <div className="row justify-content-between align-items-center text-white mb-4">
      <p className="info m-0 col-4">{day}</p>
      <p className="text-light m-0 col-4 d-flex justify-content-center">
        <img
          src={`/${weather}day.png`}
          alt="weather icon"
          height="30"
          width="30"
          className="me-1"
        />
        {weather}
      </p>
      <div className="info d-flex flex-row align-items-center col-4 justify-content-end">
        <span className="info">{num1}°</span>-
        <span className="info">{num2}°</span>
      </div>
    </div>
  );
}

interface Props {
  lat: number;
  lon: number;
}

function SevenDay({ lat, lon }: Props) {
  const [weatherData, setWeatherData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchSimpleForecast(lat, lon);
        setWeatherData(result);
      } catch (error) {
        console.log("Seven-day data error", error);
      }
    };

    fetchData();
  }, [lat, lon]);

  if (!weatherData) return <div className="text-white">Loading...</div>;

  return (
    <div
      className="d-flex flex-column justify-content-center w-100 p-3 seven-day component-bg overflow-hidden"
      style={{ height: "100%" }}
    >
      <h5 className="text-white mb-4">7-DAY FORECAST</h5>

      <RowComponent
        day="Today"
        weather={formatWeatherCode(weatherData.current.weather)}
        num1={Math.round(weatherData.current.minTemp)}
        num2={Math.round(weatherData.current.maxTemp)}
      />

      {weatherData.daily.slice(1).map((day: any, index: number) => (
        <RowComponent
          key={index}
          day={new Date(day.date).toLocaleDateString("en-US", {
            weekday: "long",
          })}
          weather={formatWeatherCode(day.weather)}
          num1={Math.round(day.minTemp)}
          num2={Math.round(day.maxTemp)}
        />
      ))}
    </div>
  );
}

export default SevenDay;
