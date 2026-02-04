import "../css/Home.css";

interface Props {
  city: string;
  main: string;
  temprature: number;
  data: any;
}

interface WeatherData {
  sys: {
    sunrise: number;
    sunset: number;
  };
  dt: number;
}

export const getDayOrNight = (weatherData: Readonly<WeatherData>): "day" | "night" => {
  const { sunrise, sunset } = weatherData.sys;
  const currentTime = weatherData.dt;

  return currentTime >= sunrise && currentTime < sunset ? "day" : "night";
};

function WeatherDisp({ city, main, temprature, data }: Props) {

  return (
    <div className="row justify-content-center align-items-center g-2 mb-2 text-white component-transperent-bg weather-disp">
      <div className="col d-flex flex-column">
        <h2>{city}</h2>
        <p>{main}</p>
        <h1 className="mt-3">{temprature}°</h1>
      </div>
      <div className="col">
        <img src={`/${main}${getDayOrNight(data)}.png`} alt="" className="image-anime"/>
      </div>
    </div>
  );
}

export default WeatherDisp;
