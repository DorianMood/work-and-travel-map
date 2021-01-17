import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import Map, { IJob } from "./Map";

const GEOCODER_API_KEY = process.env.REACT_APP_GEOCODER_API_KEY;
const GEOCODER_BASE_URL = "http://www.mapquestapi.com/geocoding/v1/batch";

function App() {
  const [rawData, setRawData] = useState<string[]>([]);

  const [data, setData] = useState<IJob[]>([]);

  const runtimeListener = (
    message: any,
    sender: chrome.runtime.MessageSender,
    callback: (response: any) => any
  ) => {
    setRawData(message.data);
  };

  useEffect(() => {
    console.log(new URL(window.location.href).searchParams.getAll("region"));
    //if (!chrome.runtime.onMessage.hasListener(runtimeListener)) {
    chrome.runtime.onMessage.addListener(runtimeListener);
    //}
  }, []);

  useEffect(() => {
    const regions: string[] = rawData.filter((item) => item !== "");
    console.log(rawData);

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
