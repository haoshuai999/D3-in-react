import React, {useState, useEffect} from 'react';
import { ReactDOM } from 'react';
import { csv, max, scaleBand, scaleLinear } from 'd3';

const corshead = "https://observable-cors.glitch.me/"
const dataUrl = corshead + "https://gist.githubusercontent.com/curran/0ac4077c7fc6390f5dd33bf5c06cb5ff/raw/605c54080c7a93a417a3cea93fd52e7550e76500/UN_Population_2019.csv";

const width = 960;
const height = 500;

const BarChart = () => {
  const [bar, setBar] = useState(null);

  useEffect(() => {
    const row = d => {
        d.Population = +d["2020"];
        return d;
    };
    csv(dataUrl, row).then(bar => {
        setBar(bar.slice(0, 20))
    });
  }, []);


  if (!bar) {
    return <pre>Loading...</pre>
  }

  console.log(bar[0])

  const xScale = scaleLinear()
    .domain([0, max(bar, d => d.Population)])
    .range([0, width]);

  const yScale = scaleBand()
    .domain(bar.map(d => d.Country))
    .range([0, height]);

  return (
    <svg width={width} height={height}>
        {bar.map(d => (
            <rect 
                x={0}
                y={yScale(d.Country)}
                width={xScale(d.Population)}
                height={yScale.bandwidth()}
            />
        ))}
    </svg>
  )
}

export default BarChart;