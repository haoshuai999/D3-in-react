import React, { useRef, useEffect } from 'react';
import { select, axisBottom } from 'd3';

export const BottomAxis = ({ xScale, innerHeight, tickFormat, tickOffset = 3 }) =>
  {
    const ref = useRef(null);
    useEffect(() => {
      const xAxisG = select(ref.current);
      const xAxis = axisBottom(xScale);
      xAxisG
        .call(
          xAxis
          .tickSize(-innerHeight)
          .tickPadding([tickOffset])
          .tickFormat(tickFormat)
        )
        .call((g) => g.select(".domain").remove());
    }, [])

    return <g transform={`translate(0, ${innerHeight})`} ref={ref} />

  };