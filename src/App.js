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

function App() {

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-center">
          <Migrants />
        </div>
      </div>
      <div className="row">
        <div className="col-12 text-center">
          <MigrantsMap />
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
