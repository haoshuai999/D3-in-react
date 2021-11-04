import logo from './logo.svg';
import ColorArc from './components/ColorArc/ColorArc';
import BarChart from './components/BarChart/BarChart';
import ScatterChart from './components/ScatterChart/Iris';
import LineChart from './components/LineChart/Temparature';
import './App.css';

function App() {
  return (
    <div>
      <ColorArc />
      <BarChart />
      <ScatterChart />
      <LineChart />
    </div>
  );
}

export default App;
