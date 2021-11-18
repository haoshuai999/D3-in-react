import React from 'react';
// import { } from 'd3';
import { useData } from "./useData";
import { Marks } from './Marks';

const width = 960;
const height = 500;
const margin = { top: 20, right: 20, bottom: 50, left: 100 };

const dataUrl = "https://unpkg.com/world-atlas@2.0.2/countries-50m.json"


const WorldMap = () => {
  const data = useData(dataUrl);

  if (!data) {
    return <pre>Loading...</pre>
  }

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  return (
    <svg width={width} height={height}>
      <Marks 
        data={data} 
      />
    </svg>
  )
}

export default WorldMap;