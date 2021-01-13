import React, { useState } from "react";
import "./App.css";
import Map, { IJob } from "./Map";

function App() {
  const [data, setData] = useState<IJob[]>([
    {
      name: "Test job",
      link: "https://ya.ru",
      tipped: true,
      location: "Boston MA",
      position: [50, 50],
    },
  ]);

  return (
    <div>
      <Map data={data} />
    </div>
  );
}

export default App;
