import React from 'react';
import { extent, scaleTime, scaleLinear, timeFormat } from 'd3';
import { useData } from "./useData";
import { LeftAxis } from './LeftAxis';
import { BottomAxis } from './BottomAxis';
import { Circles } from './Circles';

const width = 960;
const height = 500;
const margin = { top: 20, right: 20, bottom: 50, left: 100 };

const dataUrl = "https://gist.githubusercontent.com/curran/90240a6d88bdb1411467b21ea0769029/raw/7d4c3914cc6a29a7f5165f7d5d82b735d97bcfe4/week_temperature_sf.csv";

const xValue = d => d.timestamp;
const xAxisLabel = 'Time';

const yValue = d => d.temperature;
const yAxisLabel = 'Temperature';

const xLabelOffset = 35;
const yLabelOffset = 35;
const xAxisTickFormat = timeFormat("%a");

const LineChart = () => {
  const data = useData(dataUrl);

  if (!data) {
    return <pre>Loading...</pre>
  }

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xScale = scaleTime()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([innerHeight, 0])
    .nice();

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        <BottomAxis 
          xScale={xScale} 
          innerHeight={innerHeight} 
          tickFormat={xAxisTickFormat}
          tickOffset={5}
        />
        <text 
          className="axis-label" 
          textAnchor='middle'
          transform={`translate(${-yLabelOffset}, ${innerHeight / 2}) rotate(-90)`}
        >{yAxisLabel}
        </text>
        <LeftAxis 
          yScale={yScale} 
          innerWidth={innerWidth}
          tickOffset={5}
        />
        <text 
          className="axis-label" 
          x={innerWidth / 2 } 
          y={innerHeight + xLabelOffset} 
          textAnchor='middle'
        >{xAxisLabel}</text>
        <Circles 
          data={data} 
          xScale={xScale} 
          yScale={yScale} 
          xValue={xValue} 
          yValue={yValue}
          tooltipFormat={xAxisTickFormat}
          radius={7}
        />
      </g>
    </svg>
  )
}

export default LineChart;