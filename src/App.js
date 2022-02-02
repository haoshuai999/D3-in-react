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
import { useState } from 'react';

const width = 960;
const height = 500;
const histogramSize = 0.3

function App() {

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-center">
          <MigrantsMap width={width} height={height} />
          <Migrants width={width} height={height * histogramSize}/>
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
