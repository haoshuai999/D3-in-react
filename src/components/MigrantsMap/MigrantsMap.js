import React from 'react';
import { scaleSqrt, max } from 'd3';
import { useLand } from "./useLand";
import { Marks } from './Marks';

const landUrl = "https://unpkg.com/world-atlas@2.0.2/countries-50m.json";


const MigrantsMap = ({ data, width, height}) => {
  const lands = useLand(landUrl);

  if (!lands || !data) {
    return <pre>Loading...</pre>
  }

  const sizeValue = d => d["Total Dead and Missing"];
  const maxRadius = 10;

  const sizeScale = scaleSqrt()
        .domain([0, max(data, sizeValue)])
        .range([0, maxRadius]);

  return (
    <svg width={width} height={height}>
      <Marks 
        lands={lands} 
        data={data}
        sizeScale={sizeScale}
        sizeValue={sizeValue}
      />
    </svg>
  )
}

export default MigrantsMap;