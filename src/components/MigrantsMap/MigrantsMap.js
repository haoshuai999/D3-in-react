import React, { useMemo } from 'react';
import { scaleSqrt, max } from 'd3';
import { Marks } from './Marks';

const sizeValue = d => d["Total Dead and Missing"];
const maxRadius = 10;

const MigrantsMap = ({ data, lands, filteredData, width, height}) => {

  const sizeScale = useMemo(() => scaleSqrt()
        .domain([0, max(data, sizeValue)])
        .range([0, maxRadius]),
      [data, sizeValue, maxRadius]
  )

  return (
    <svg width={width} height={height}>
      <Marks 
        lands={lands} 
        data={filteredData}
        sizeScale={sizeScale}
        sizeValue={sizeValue}
      />
    </svg>
  )
}

export default MigrantsMap;