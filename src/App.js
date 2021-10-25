import logo from './logo.svg';
import ColorArc from './components/ColorArc/ColorArc';
import BarChart from './components/BarChart/BarChart';
import Iris from './components/ScatterChart/Iris'
import './App.css';

function App() {
  return (
    <div>
      <ColorArc />
      <BarChart />
      <Iris />
    </div>
  );
}

export default App;
