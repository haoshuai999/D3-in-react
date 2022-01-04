import React from 'react';
import { scaleSqrt, max } from 'd3';
import { useCity } from "./useCity";
import { useLand } from "./useLand";
import { Marks } from './Marks';

const width = 960;
const height = 500;
const margin = { top: 20, right: 20, bottom: 50, left: 100 };

const landUrl = "https://unpkg.com/world-atlas@2.0.2/countries-50m.json";
const cityUrl = "https://gist.githubusercontent.com/curran/13d30e855d48cdd6f22acdf0afe27286/raw/0635f14817ec634833bb904a47594cc2f5f9dbf8/worldcities_clean.csv"


const WorldMap = () => {
  const lands = useLand(landUrl);
  const cities = useCity(cityUrl);

  if (!lands || !cities) {
    return <pre>Loading...</pre>
  }

  const sizeValue = d => d.population;
  const maxRadius = 10;

  const sizeScale = scaleSqrt()
        .domain([0, max(cities, sizeValue)])
        .range([0, maxRadius]);

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  return (
    <svg width={width} height={height}>
      <Marks 
        lands={lands} 
        cities={cities}
        sizeScale={sizeScale}
        sizeValue={sizeValue}
      />
    </svg>
  )
}

export default WorldMap;