import React from 'react';
import { scaleTime, scaleLinear, extent, max, timeFormat } from 'd3';
import { useData } from "./useData";
import { Marks } from './Marks';
import { LeftAxis } from './LeftAxis';
import { BottomAxis } from './BottomAxis';
import { YMarkerline } from './YMarkerline';

const width = 960;
const height = 700;
const margin = { top: 20, right: 20, bottom: 50, left: 90 };

const dataUrl = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv";

const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

const xAxisTickFormat = timeFormat("%m/%d/%y");
const xAxisLabel = "Date";
const xLabelOffset = 35;

const yAxisLabel = "Total Number of COVID Deaths";
const yLabelOffset = 65;

const Covid = () => {
  const data = useData(dataUrl);

  if (!data) {
    return <pre>Loading...</pre>
  }

  const xValue = d => d.date

  const yValue = d => d.deathTotal

  const xScale = scaleTime()
    .domain(extent(data, d => d.date))
    .range([0, innerWidth])

  const yScale = scaleLinear()
    .domain([0, max(data, d => d.deathTotal)])
    .range([innerHeight, 0])

  console.log(yScale.domain())

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
          x={innerWidth / 2}
          y={innerHeight + xLabelOffset}
          textAnchor='middle'
        >{xAxisLabel}</text>
        <YMarkerline 
          value={5000000} 
          yScale={yScale}
          innerWidth={innerWidth}
        />
        <Marks
          data={data}
          xScale={xScale}
          yScale={yScale}
          xValue={xValue}
          yValue={yValue}
        />
      </g>
    </svg>
  )
}

export default Covid;