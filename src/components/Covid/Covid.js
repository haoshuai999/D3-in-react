import React from 'react';
import { scaleTime, scaleLinear, extent, max } from 'd3';
import { useData } from "./useData";
import { Marks } from './Marks';

const width = 960;
const height = 500;

const dataUrl = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv";

const sum = (accu, current) => accu + current;

const Covid = () => {
  const data = useData(dataUrl);

  if (!data) {
    return <pre>Loading...</pre>
  }

  const xValue = d => d.date

  const yValue = d => d.deathTotal

  // const latestDate = data.columns[data.columns.length - 1];
  // const deathTotal = data.map(d => +d[latestDate]).reduce(sum, 0);
  // const messages = deathTotal + " deaths";

  // console.log(messages)
  const xScale = scaleTime()
      .domain(extent(data, d => d.date))
      .range([0, width])

  const yScale = scaleLinear()
      .domain([0, max(data, d => d.deathTotal)])
      .range([height, 0])
  
  console.log(yScale.domain())

  return (
    <svg width={width} height={height}>
      <Marks 
        data = {data}
        xScale = {xScale}
        yScale = {yScale}
        xValue = {xValue}
        yValue = {yValue}
      />
    </svg>
  )
}

export default Covid;