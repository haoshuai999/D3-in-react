import Migrants from './components/Migrants/Migrants';
import MigrantsMap from './components/MigrantsMap/MigrantsMap'
import './App.css';
import { useData } from './useData';
import { useLand } from './useLand';
import { useState, useMemo } from 'react';

const width = 960;
const height = 500;
const histogramSize = 0.3;

const landUrl = "https://unpkg.com/world-atlas@2.0.2/countries-50m.json";
const dataUrl = "https://gist.githubusercontent.com/curran/a9656d711a8ad31d812b8f9963ac441c/raw/c22144062566de911ba32509613c84af2a99e8e2/MissingMigrants-Global-2019-10-08T09-47-14-subset.csv";

const xValue = d => d["Reported Date"];

function App() {
  const [brushExtent, setBrushExtent] = useState();
  const data = useData(dataUrl);
  const lands = useLand(landUrl);

  if (!data || !lands) {
    return <pre>Loading...</pre>
  }

  const filteredData = brushExtent ? data.filter(d => {
    const date = xValue(d)
    return date > brushExtent[0] && date < brushExtent[1];
  }) : data

  return (
    <>
      <MigrantsMap 
        data={data} 
        lands={lands} 
        filteredData={filteredData}
        width={width} 
        height={height} 
      />
      <Migrants 
        data={data} 
        width={width} 
        height={height * histogramSize}
        setBrushExtent={setBrushExtent}
        xValue={xValue}
      />
    </>
  )
}

export default App;
