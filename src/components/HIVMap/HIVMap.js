import React from 'react';
import { scaleSequential, interpolateYlOrRd, max } from 'd3';
import { useData } from "./useData";
import { useLand } from "./useLand";
import { useCode } from "./useCode";
import { Marks } from './Marks';

const width = 960;
const height = 500;

const landUrl = "https://unpkg.com/world-atlas@2.0.2/countries-50m.json";
const codeUrl = "https://raw.githubusercontent.com/lukes/ISO-3166-Countries-with-Regional-Codes/master/slim-3/slim-3.csv"
const dataUrl = "https://gist.githubusercontent.com/curran/470752f12c027f8ff4266e7c96f26a56/raw/66908b56e371e7c9f5a1c0911ac3250f570a4c83/share-of-population-infected-with-hiv-ihme.csv"
const selectedYear = "2017";

const WorldMap = () => {
  const lands = useLand(landUrl);
  const data = useData(dataUrl);
  const codes = useCode(codeUrl);

  if (!lands || !data || !codes) {
    return <pre>Loading...</pre>
  }

  const filteredData = data.filter(d => d.Year === selectedYear)
  
  const countryMap = new Map();
  const codeMap = new Map();
  codes.forEach(d => {
    codeMap.set(d["alpha-3"], d["country-code"])
  })

  filteredData.forEach(d => {
    const numericCode = codeMap.get(d.Code)
    countryMap.set(numericCode, d)
  });

  const colorValue = d => d.aids;

  const colorScale = scaleSequential(interpolateYlOrRd)
        .domain([0, max(data, colorValue)]);


  return (
    <svg width={width} height={height}>
      <Marks 
        lands={lands}
        countryMap={countryMap}
        colorScale={colorScale}
        colorValue={colorValue}
      />
    </svg>
  )
}

export default WorldMap;