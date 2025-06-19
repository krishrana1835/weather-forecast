import { useEffect, useState } from "react";
import { fetchTodayForecast } from "../api/weatherApi";
import { getDayOrNight } from "./WeatherDisp";

interface Props {
  lat: number;
  lon: number;
  data: any;
}

function TodayForecast({ lat, lon, data }: Props) {
  const [weatherData, setWeatherData] = useState<
    { time: string; weather: string; temperature: number }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchTodayForecast(lat, lon);
        setWeatherData(result);
      } catch (error) {
        console.log("5-days Forcast error", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-100 component-bg todayforcast p-3">
      <p className="d-flex justify-content-start">NEXT 24 HOURS</p>
      <div className="forecast-row">
        {weatherData.map((info, index) => (
          <div key={index} className="forecast-item text-center">
            <p className="info m-0">
              {info.time.split(" ")[1].split(":")[0]}:00
            </p>
            <img
              src={`/${data.weather[0].main}${
                parseInt(info.time.split(" ")[1].split(":")[0], 10) > 6 &&
                parseInt(info.time.split(" ")[1].split(":")[0], 10) < 19
                  ? "day"
                  : "night"
              }.png`}
              alt=""
              height="50"
              width="50"
              className="my-2"/>
            <p className="info m-0">{info.temperature}°</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodayForecast;
