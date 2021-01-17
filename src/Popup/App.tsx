import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import Map, { IJob } from "./Map";

// TODO : better hide this somewhere, atleast from repo

const GEOCODER_API_KEY = "Yyq4fbX9mEdB41MneJmVVFaGRcdYY4f1";
const GEOCODER_BASE_URL = "http://www.mapquestapi.com/geocoding/v1/batch";

function App() {
  const [rawData, setRawData] = useState<any[]>([]);

  const [data, setData] = useState<IJob[]>([]);

  useEffect(() => {
    chrome.tabs.query(
      { active: true, currentWindow: true },
      (tabs: chrome.tabs.Tab[]) => {
        chrome.tabs.sendMessage(
          tabs[0].id ?? 0,
          {
            type: "WORK_AND_TRAVEL_PARSE",
          },
          (response: any) => {
            if (response.type === "WORK_AND_TRAVEL_PARSE_DONE") {
              setRawData(response.data);
            }
          }
        );
      }
    );
  }, []);

  useEffect(() => {
    const regions: string[] = rawData.map((item: any) => item.location);

    const url = `${GEOCODER_BASE_URL}?key=${GEOCODER_API_KEY}&location=${regions
      .map((item) => encodeURI(item))
      .join("&location=")}&maxResults=1`;

    axios
      .get(url)
      .then((response: AxiosResponse) => {
        const results: any[] = response.data?.results;
        const locations: any[] = [].concat.apply(
          [],
          results.map((item) => item.locations)
        );
        setData(
          locations.map((item, index) => {
            return {
              name: rawData[index].name,
              link: rawData[index].link,
              tipped: rawData[index].tipped,
              location: rawData[index].location,
              position: [item["latLng"]["lat"], item["latLng"]["lng"]],
            };
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, [rawData]);

  return (
    <div style={{ width: 600, height: 550 }}>
      <Map data={data} />
    </div>
  );
}

export default App;
