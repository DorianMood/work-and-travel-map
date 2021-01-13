import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";
import Map, { IJob } from "./Map";

const GEOCODER_API_KEY = process.env.REACT_APP_GEOCODER_API_KEY;
const GEOCODER_BASE_URL = "http://www.mapquestapi.com/geocoding/v1/batch";

function App() {
  const [rawData, setRawData] = useState<IJob[]>([
    {
      name: "Test job",
      link: "https://ya.ru",
      tipped: true,
      location: "Wisc Dells, WI Midwest",
      position: [1, 1],
    },
  ]);

  const [data, setData] = useState<IJob[]>([]);

  useEffect(() => {
    const body = {
      batch: rawData.map((item) => ({ query: item.location, country: "US" })),
    };

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    axios
      .post(`${GEOCODER_BASE_URL}?key=${GEOCODER_API_KEY}`, body)
      .then((response) => {
        console.log(response);
      });
  }, [rawData]);

  return (
    <div>
      <Map data={data} />
    </div>
  );
}

export default App;
