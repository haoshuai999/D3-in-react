import React from 'react';
import { extent, scaleTime, scaleLinear, timeFormat } from 'd3';
import { useData } from "./useData";
import { LeftAxis } from './LeftAxis';
import { BottomAxis } from './BottomAxis';
import { Lines } from './Lines';

const width = 960;
const height = 500;
const margin = { top: 20, right: 20, bottom: 50, left: 100 };

const dataUrl = "https://gist.githubusercontent.com/curran/a9656d711a8ad31d812b8f9963ac441c/raw/c22144062566de911ba32509613c84af2a99e8e2/MissingMigrants-Global-2019-10-08T09-47-14-subset.csv";

const xValue = d => d["Reported Date"];
const xAxisLabel = 'Time';

const yValue = d => d["Total Dead and Missing"];
const yAxisLabel = 'Total Dead and Missing';

const xLabelOffset = 35;
const yLabelOffset = 35;
const xAxisTickFormat = timeFormat("%m/%d/%Y");

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
          tickOffset={7}
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
          tickOffset={7}
        />
        <text 
          className="axis-label" 
          x={innerWidth / 2 } 
          y={innerHeight + xLabelOffset} 
          textAnchor='middle'
        >{xAxisLabel}</text>
        <Lines 
          data={data} 
          xScale={xScale} 
          yScale={yScale} 
          xValue={xValue} 
          yValue={yValue}
          tooltipFormat={xAxisTickFormat}
          radius={2}
        />
      </g>
    </svg>
  )
}

export default LineChart;