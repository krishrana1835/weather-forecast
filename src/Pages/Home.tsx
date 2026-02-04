import AirConditions from "../components/AirConditions";
import SevenDay from "../components/SevenDay";
import TodayForcast from "../components/TodayForcast";
import WeatherDisp from "../components/WeatherDisp";


function Home({data, location}: any) {
  if (!data || !data?.weather || !data?.main) {
    return (
      <div className="container text-center text-white mt-5">
        <h4>Loading weather data...</h4>
      </div>
    );
  }

  return (
    <div className="container d-flex flex-column justify-content-center">
      <div className="row justify-content-center align-items-center g-4">
        <div className="col-12 col-lg-8">
          <div className="text-center">
            <WeatherDisp
              city={data.name}
              main={data.weather[0].main}
              temprature={data.main.temp}
              data={data}
            />
            <TodayForcast lat={data.coord.lat} lon={data.coord.lon} data={data}/> <br />
            <AirConditions rf={data.main.feels_like} wind={data.wind.speed} humidity={data.main.humidity}/>
          </div>
        </div>
        <div className="col-12 col-lg-4">
          <SevenDay lat={location.lat} lon={location.lon} />
        </div>
      </div>
    </div>
  );
}

export default Home;