import { Link } from "react-router-dom";
import "../css/Home.css";

function NavBar() {
  return (
    <div className="d-flex flex-row m-3 rounded justify-content-center align-items-center component-bg">
      <Link className="d-flex flex-column text-white mx-5 mt-3" to="/" style={{textDecoration: 'none'}}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-cloud-haze2-fill"
          viewBox="0 0 16 16"
          style={{ alignSelf: "center", cursor: "pointer" }}
        >
          <path d="M8.5 2a5 5 0 0 1 4.905 4.027A3 3 0 0 1 13 12H3.5A3.5 3.5 0 0 1 .035 9H5.5a.5.5 0 0 0 0-1H.035a3.5 3.5 0 0 1 3.871-2.977A5 5 0 0 1 8.5 2m-6 8a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1zM0 13.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5" />
        </svg>
        <p style={{ alignSelf: "center", cursor: "pointer" }}>Weather</p>
      </Link>
      <Link className="d-flex flex-column text-white mx-5 mt-3" to="/Search" style={{textDecoration: 'none'}}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-geo-alt-fill"
          viewBox="0 0 16 16"
          style={{ alignSelf: "center", cursor: "pointer" }}
        >
          <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
        </svg>
        <p style={{ alignSelf: "center", cursor: "pointer" }}>City</p>
      </Link>
    </div>
  );
}

export default NavBar;
