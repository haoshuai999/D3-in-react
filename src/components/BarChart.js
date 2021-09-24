import React, {useState, useEffect} from 'react';
import { ReactDOM } from 'react';
import { csv, max, scaleBand, scaleLinear } from 'd3';

const dataUrl = "https://gist.githubusercontent.com/curran/0ac4077c7fc6390f5dd33bf5c06cb5ff/raw/605c54080c7a93a417a3cea93fd52e7550e76500/UN_Population_2019.csv";

const width = 960;
const height = 500;
const margin = { top: 20, right: 20, bottom: 20, left: 250 };

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

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xScale = scaleLinear()
    .domain([0, max(bar, d => d.Population)])
    .range([0, innerWidth]);

  const yScale = scaleBand()
    .domain(bar.map(d => d.Country))
    .range([0, innerHeight])
    .padding(0.1);


  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        {xScale.ticks().map(tick => (
          <g key={tick} transform={`translate(${xScale(tick)},0)`}>
            <line
              y2={innerHeight}
              stroke="black"
            />
            <text 
              style={{textAnchor: 'middle'}}
              y={innerHeight + 3}
              dy="0.71em"
            >{tick}</text>
          </g>
        ))}
        {yScale.domain().map(tick => (
          <text 
            key={tick}
            style={{textAnchor: 'end'}}
            x={-3}
            y={yScale(tick) + yScale.bandwidth() / 2}
            dy="0.32em"
          >{tick}</text>
        ))}
        {bar.map(d => (
            <rect
              key={d.Country}
              x={0}
              y={yScale(d.Country)}
              width={xScale(d.Population)}
              height={yScale.bandwidth()}
            />
        ))}
      </g>
    </svg>
  )
}

export default BarChart;