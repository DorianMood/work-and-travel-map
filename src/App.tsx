import axios, { AxiosResponse } from "axios";
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
      location: "Wisc Dells, WI",
      position: [1, 1],
    },
    {
      name: "Test job",
      link: "https://ya.ru",
      tipped: true,
      location: "Saratoga, WY",
      position: [1, 1],
    },
  ]);

  const [data, setData] = useState<IJob[]>([]);

  useEffect(() => {
    console.log(new URL(window.location.href).searchParams.getAll("region"));
  }, []);

  useEffect(() => {
    const regions: string[] = new URL(window.location.href).searchParams.getAll(
      "region"
    );

    const url = `${GEOCODER_BASE_URL}?key=${GEOCODER_API_KEY}&location=${regions
      .map((item) => encodeURI(item))
      .join("&location=")}&limit=${rawData.length}`;

    console.log(url);

    axios
      .get(url)
      .then((response: AxiosResponse) => {
        const results: any[] = response.data?.results;
        const locations: any[] = [].concat.apply(
          [],
          results.map((item) => item.locations)
        );
        setData(
          locations.map((item) => {
            return {
              name: "1",
              link: "link",
              tipped: true,
              location: "1",
              position: [item["latLng"]["lat"], item["latLng"]["lng"]],
            };
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, [rawData]);

  console.log(data);

  return (
    <div>
      <Map data={data} />
    </div>
  );
}

export default App;
