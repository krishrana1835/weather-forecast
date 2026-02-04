import axios from "axios";

const apiKey = "d16b5b5e5515d64e3059ab1d5c7b6340";

// --- Types ---
export interface City {
  name: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;
}

export interface Location {
  lat: number;
  lon: number;
}

// --- Fetch 5-hour Forecast ---
export async function fetchTodayForecast(lat: number, lon: number) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    const res = await axios.get(url);
    const list = res.data.list;

    const now = Date.now();
    const plus24h = now + 24 * 60 * 60 * 1000;

    const todayForecasts = list.filter((item: any) => {
      const forecastTime = new Date(item.dt_txt + "Z").getTime();
      return forecastTime >= now && forecastTime <= plus24h;
    });

    return todayForecasts.map((item: any) => ({
      time: item.dt_txt,
      weather: item.weather[0].main,
      temperature: item.main.temp,
    }));
  } catch (error) {
    console.error('Error fetching today forecast:', error);
    return [];
  }
}


// --- Fetch City Suggestions ---
export const fetchCitySuggestions = async (
  query: string,
  limit = 5
): Promise<City[]> => {
  if (query.length <= 2) return [];

  try {
    const { data } = await axios.get<City[]>(
      "https://api.openweathermap.org/geo/1.0/direct",
      {
        params: {
          q: query,
          limit,
          appid: apiKey,
        },
      }
    );

    return data;
  } catch (error) {
    console.error("City suggestion error:", error);
    return [];
  }
};

// --- Fetch Current Weather for a Location ---
export const fetchWeather = async ({ lat, lon }: Location) => {
  try {
    const { data } = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
      params: {
        lat,
        lon,
        appid: apiKey,
        units: "metric",
      },
    });

    return data;
  } catch (error) {
    console.error("Error fetching current weather:", error);
    throw new Error("Failed to fetch weather data");
  }
};

interface ForecastDay {
  date: string;
  minTemp: number;
  maxTemp: number;
  weather: string;
}

interface WeatherResult {
  current: {
    temperature: number;
    minTemp: number;
    maxTemp: number;
    weather: string;
  };
  daily: ForecastDay[];
}

export async function fetchSimpleForecast(lat: number, lon: number): Promise<WeatherResult> {
  const url = `https://api.met.no/weatherapi/locationforecast/2.0/complete?lat=${lat}&lon=${lon}`;
  const res = await axios.get(url);
  const timeseries = res.data.properties.timeseries;

  const grouped: Record<string, {
    temps: number[],
    afterNoonSymbol?: string
  }> = {};

  for (const item of timeseries) {
    const dateTime = new Date(item.time);
    const date = item.time.slice(0, 10);
    const hour = dateTime.getHours();
    const temp = item.data.instant.details.air_temperature;
    const code = item.data.next_12_hours?.summary?.symbol_code?.split('_')[0] ?? null;

    if (!grouped[date]) {
      grouped[date] = { temps: [] };
    }

    grouped[date].temps.push(temp);

    
    if (code && hour >= 12 && !grouped[date].afterNoonSymbol) {
      grouped[date].afterNoonSymbol = code;
    }
  }

  const dates = Object.keys(grouped);
  const today = dates[0];
  const todayGroup = grouped[today];
  const currentTemp = timeseries[0].data.instant.details.air_temperature;

  return {
    current: {
      temperature: currentTemp,
      minTemp: Math.min(...todayGroup.temps),
      maxTemp: Math.max(...todayGroup.temps),
      weather: todayGroup.afterNoonSymbol ?? "unknown"
    },
    daily: dates.slice(0, 7).map(date => {
      const group = grouped[date];
      return {
        date,
        minTemp: Math.min(...group.temps),
        maxTemp: Math.max(...group.temps),
        weather: group.afterNoonSymbol ?? "unknown"
      };
    })
  };
}
