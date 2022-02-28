import React, { useRef, useEffect } from 'react';
import { select, axisLeft } from 'd3';

export const LeftAxis = ({yScale, innerWidth, tickOffset= 3}) => {
  const ref = useRef(null);
  useEffect(() => {
    const yAxisG = select(ref.current);
    const yAxis = axisLeft(yScale);
    yAxisG
      .call(
        yAxis
        .ticks(10, "~s")
        .tickSize(-innerWidth)
        .tickPadding([tickOffset])
        //.tickFormat((tickValue) => tickValue)
      )
      .call((g) => g.select(".domain").remove());
  }, [])

  return <g ref={ref} />
}