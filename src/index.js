import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import WorldMap from './components/WorldMap/WorldMap';
import HIVMap from './components/HIVMap/HIVMap';
import ColorArc from './components/ColorArc/ColorArc';
import BarChart from './components/BarChart/BarChart';
import ScatterChart from './components/ScatterChart/Iris';
import Scatter from './components/ScatterMenu/Scatter';
import LineChart from './components/LineChart/Temparature';
import CovidData from './components/Covid/CovidData';

ReactDOM.render(
  <React.StrictMode>
    <div className="container">
    <div className="row">
        <div className="col-12 text-center">
          <CovidData />
        </div>
      </div>
      <div className="row">
        <div className="col-12 text-center">
          <App />
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
      <div className="row">
        <div className="col-12 text-center">
          <HIVMap />
        </div>
      </div> 
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
