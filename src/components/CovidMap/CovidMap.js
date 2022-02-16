import React from 'react';
import { scaleSequential, interpolateYlOrRd, max } from 'd3';
import { useData } from "./useData";
import { useLand } from "./useLand";
import { Marks } from './Marks';

const width = window.innerWidth;
const height = window.innerHeight;

const landUrl = "https://unpkg.com/world-atlas@2.0.2/countries-50m.json";
const dataUrl = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv";

const sum = (accu, current) => accu + current;

const CovidMap = () => {
  const lands = useLand(landUrl);
  const data = useData(dataUrl);

  if (!lands || !data) {
    return <pre>Loading...</pre>
  }

  const latestDate = data.columns[data.columns.length - 1];
  const deathTotal = data.map(d => +d[latestDate]).reduce(sum, 0);
  const messages = deathTotal + " deaths";

  console.log(messages)

  const colorValue = d => d.aids;

  const colorScale = scaleSequential(interpolateYlOrRd)
        .domain([0, max(data, colorValue)]);


  return (
    <svg width={width} height={height}>
      <Marks 
        lands={lands}
        countryMap={data}
        colorScale={colorScale}
        colorValue={colorValue}
      />
    </svg>
  )
}

export default CovidMap;