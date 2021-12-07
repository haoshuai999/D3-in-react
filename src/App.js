import logo from './logo.svg';
import ColorArc from './components/ColorArc/ColorArc';
import BarChart from './components/BarChart/BarChart';
import ScatterChart from './components/ScatterChart/Iris';
import ScatterMenu from './components/ScatterMenu/ScatterMenu';
import LineChart from './components/LineChart/Temparature';
import './App.css';
import WorldMap from './components/WorldMap/WorldMap';
import { useState } from 'react';

const options = [
  { value: "dog", label: "Dog" }, 
  { value: "cat", label: "Cat" } 
];

const init = "cat"

function App() {
  const [selectedValue, setSelectedValue] = useState(init);
  console.log(selectedValue)

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <ScatterMenu 
            options={options} 
            id="pet-select" 
            selectedValue = {selectedValue}
            onSelectedValueChange={setSelectedValue}
          />
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
