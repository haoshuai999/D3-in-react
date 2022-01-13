import React from 'react';
import { scaleSqrt, max } from 'd3';
import { useData } from "./useData";
import { useLand } from "./useLand";
import { Marks } from './Marks';

const width = 960;
const height = 500;
const margin = { top: 20, right: 20, bottom: 50, left: 100 };

const landUrl = "https://unpkg.com/world-atlas@2.0.2/countries-50m.json";
const dataUrl = "https://gist.githubusercontent.com/curran/a9656d711a8ad31d812b8f9963ac441c/raw/c22144062566de911ba32509613c84af2a99e8e2/MissingMigrants-Global-2019-10-08T09-47-14-subset.csv"


const WorldMap = () => {
  const lands = useLand(landUrl);
  const data = useData(dataUrl);

  if (!lands || !data) {
    return <pre>Loading...</pre>
  }

  const sizeValue = d => d["Total Dead and Missing"];
  const maxRadius = 10;

  const sizeScale = scaleSqrt()
        .domain([0, max(data, sizeValue)])
        .range([0, maxRadius]);

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

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

export default WorldMap;