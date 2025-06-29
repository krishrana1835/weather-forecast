import { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Home.css";
import { fetchCitySuggestions, type City } from "../api/weatherApi";

function Search({setCity}: any) {
  const navigate = useNavigate();
  const [query, setQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<City[]>([]);

  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    const cities = await fetchCitySuggestions(value, 4);
    setSuggestions(cities);
  };

  const handleSelect = (city: City) => {
    setCity({city: city.name, lat: city.lat, lon: city.lon})
    setQuery(city.name);
    setSuggestions([]);
    navigate("/");
  };

  return (
    <div className="mt-3">
      <div className="search-bar-container d-flex justify-content-center ">
        <div className="w-75 search-bar d-flex align-items-center px-3 py-2 shadow-sm mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-search text-white me-2"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
          <input
            type="text"
            className="search-input text-white"
            placeholder="Search City"
            value={query}
            onChange={handleInputChange}
          />
        </div>
      </div>

      {suggestions.length > 0 && (
        <div className="suggestion-list d-flex justify-content-center align-items-center flex-column">
          {suggestions.map((city, index) => (
            <div
              key={index}
              onClick={() => handleSelect(city)}
              className="suggestion-item text-white p-2 m-2 w-75 component-bg d-flex justify-content-start align-items-center"
              style={{ cursor: "pointer" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-geo-fill"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.3 1.3 0 0 0-.37.265.3.3 0 0 0-.057.09V14l.002.008.016.033a.6.6 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.6.6 0 0 0 .146-.15l.015-.033L12 14v-.004a.3.3 0 0 0-.057-.09 1.3 1.3 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465s-2.462-.172-3.34-.465c-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411"
                />
              </svg>
              <p className="info mt-1 px-3">
                {city.name}
                {city.state ? `, ${city.state}` : ""}
                {`, ${city.country}`}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;
