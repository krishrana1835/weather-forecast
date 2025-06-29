interface Props {
  rf: number;
  wind: number;
  humidity: number;
}

function AirConditions({ rf, wind, humidity }: Props) {
  return (
    <div className="w-100 component-bg air-con">
      <p className="d-flex justify-content-start p-3">AIR CONDITONS</p>
      <div className="d-flex flex-row justify-content-center align-items-center">
        <div className="d-flex flex-column mx-3">
          <p className="info">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-thermometer-half"
              viewBox="0 0 16 16"
            >
              <path d="M9.5 12.5a1.5 1.5 0 1 1-2-1.415V6.5a.5.5 0 0 1 1 0v4.585a1.5 1.5 0 0 1 1 1.415" />
              <path d="M5.5 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0zM8 1a1.5 1.5 0 0 0-1.5 1.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0l-.166-.15V2.5A1.5 1.5 0 0 0 8 1" />
            </svg>{" "}
            Real Feel
          </p>
          <h3 className="text-white ">{rf}°</h3>
        </div>
        <div className="d-flex flex-column mx-3">
          <p className="info">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-wind"
              viewBox="0 0 16 16"
            >
              <path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5m-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2M0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5" />
            </svg>{" "}
            Wind
          </p>
          <h3 className="text-white">{wind} km/h</h3>
        </div>
        <div className="d-flex flex-column mx-3">
          <p className="info">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-moisture"
              viewBox="0 0 16 16"
            >
              <path d="M13.5 0a.5.5 0 0 0 0 1H15v2.75h-.5a.5.5 0 0 0 0 1h.5V7.5h-1.5a.5.5 0 0 0 0 1H15v2.75h-.5a.5.5 0 0 0 0 1h.5V15h-1.5a.5.5 0 0 0 0 1h2a.5.5 0 0 0 .5-.5V.5a.5.5 0 0 0-.5-.5zM7 1.5l.364-.343a.5.5 0 0 0-.728 0l-.002.002-.006.007-.022.023-.08.088a29 29 0 0 0-1.274 1.517c-.769.983-1.714 2.325-2.385 3.727C2.368 7.564 2 8.682 2 9.733 2 12.614 4.212 15 7 15s5-2.386 5-5.267c0-1.05-.368-2.169-.867-3.212-.671-1.402-1.616-2.744-2.385-3.727a29 29 0 0 0-1.354-1.605l-.022-.023-.006-.007-.002-.001zm0 0-.364-.343zm-.016.766L7 2.247l.016.019c.24.274.572.667.944 1.144.611.781 1.32 1.776 1.901 2.827H4.14c.58-1.051 1.29-2.046 1.9-2.827.373-.477.706-.87.945-1.144zM3 9.733c0-.755.244-1.612.638-2.496h6.724c.395.884.638 1.741.638 2.496C11 12.117 9.182 14 7 14s-4-1.883-4-4.267" />
            </svg>{" "}
            Humidity
          </p>
          <h3 className="text-white">{humidity}</h3>
        </div>
      </div>
    </div>
  );
}

export default AirConditions;
