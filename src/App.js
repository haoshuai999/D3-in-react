import logo from './logo.svg';
import ColorArc from './components/ColorArc/ColorArc';
import BarChart from './components/BarChart/BarChart';
import ScatterChart from './components/ScatterChart/Iris';
import Scatter from './components/ScatterMenu/Scatter';
import LineChart from './components/LineChart/Temparature';
import Migrants from './components/Migrants/Migrants';
import MigrantsMap from './components/MigrantsMap/MigrantsMap'
import './App.css';
import WorldMap from './components/WorldMap/WorldMap';
import { useData } from './useData';
import { useState } from 'react';

const width = 960;
const height = 500;
const histogramSize = 0.3
const dataUrl = "https://gist.githubusercontent.com/curran/a9656d711a8ad31d812b8f9963ac441c/raw/c22144062566de911ba32509613c84af2a99e8e2/MissingMigrants-Global-2019-10-08T09-47-14-subset.csv";

function App() {
  const [brushExtent, setBrushExtent] = useState();
  const data = useData(dataUrl);

  const xValue = d => d["Reported Date"];

  if (!data) {
    return <pre>Loading...</pre>
  }

  const filterData = brushExtent ? data.filter(d => {
    const date = xValue(d)
    return date > brushExtent[0] && date < brushExtent[1];
  }) : data

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-center">
          <MigrantsMap data={filterData} width={width} height={height} />
          <Migrants 
            data={data} 
            width={width} 
            height={height * histogramSize}
            setBrushExtent={setBrushExtent}
            xValue={xValue}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-12 text-center">
          <Scatter />
        </div>
      </div>
      <div className="row">
        <div className="col-12 text-center">
          <ColorArc />
        </div>
      </div>
      <div className="row">
        <div className="col-12 text-center">
          <BarChart />
        </div>
      </div>
      <div className="row">
        <div className="col-12 text-center">
          <ScatterChart />
        </div>
      </div>
      <div className="row">
        <div className="col-12 text-center">
          <LineChart />
        </div>
      </div>
      <div className="row">
        <div className="col-12 text-center">
          <WorldMap />
        </div>
      </div>   
    </div>
  );
}

export default App;
