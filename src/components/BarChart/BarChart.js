import React from 'react';
import { max, scaleBand, scaleLinear, format } from 'd3';
import { useData } from "./useData";
import { LeftAxis } from './LeftAxis';
import { BottomAxis } from './BottomAxis';
import { Marks } from './Marks';

const width = 960;
const height = 500;
const margin = { top: 20, right: 20, bottom: 50, left: 270 };

const dataUrl = "https://gist.githubusercontent.com/curran/0ac4077c7fc6390f5dd33bf5c06cb5ff/raw/605c54080c7a93a417a3cea93fd52e7550e76500/UN_Population_2019.csv";

const yValue = d => d.Country;
const xValue = d => d.Population;

const xLabelOffset = 35;
const xAxisTickFormat = tickValue => format(".2s")(tickValue).replace('G','B');

const BarChart = () => {
  const bar = useData(dataUrl);

  if (!bar) {
    return <pre>Loading...</pre>
  }

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xScale = scaleLinear()
    .domain([0, max(bar, xValue)])
    .range([0, innerWidth]);

  const yScale = scaleBand()
    .domain(bar.map(yValue))
    .range([0, innerHeight])
    .padding(0.1);


  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        <BottomAxis 
          xScale={xScale} 
          innerHeight={innerHeight} 
          tickFormat={xAxisTickFormat}
        />
        <LeftAxis yScale={yScale} />
        <text 
          className="xaxis-label" 
          x={innerWidth / 2 } 
          y={innerHeight + xLabelOffset} 
          textAnchor='middle'
        >Population</text>
        <Marks 
          data={bar} 
          xScale={xScale} 
          yScale={yScale} 
          xValue={xValue} 
          yValue={yValue}
          tooltipFormat={xAxisTickFormat}
        />
      </g>
    </svg>
  )
}

export default BarChart;