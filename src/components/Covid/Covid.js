import React, { useCallback, useState, useMemo } from 'react';
import { scaleTime, scaleLog, extent, max, timeFormat } from 'd3';
import { Marks } from './Marks';
import { LeftAxis } from './LeftAxis';
import { BottomAxis } from './BottomAxis';
import { YMarkerline } from './YMarkerline';
import { VoronoiOverlay } from './VoronoiOverlay';

const width = 960;
const height = 700;
const margin = { top: 40, right: 20, bottom: 50, left: 70 };

const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

const xAxisTickFormat = timeFormat("%m/%d/%y");
const xAxisLabel = "Date";
const xLabelOffset = 35;

const yAxisLabel = "Total Number of COVID Deaths";
const yLabelOffset = 55;

const epsilon = 0.1;

export const Covid = ({ data }) => {
  const [activeRow, setActiveRow] = useState();

  const handleVoronoiHover = useCallback(setActiveRow, []);

  const allData = useMemo(() => 
    data.reduce((accu, timeSeries) => accu.concat(timeSeries), [])
  , [data]);


  const xValue = useMemo(() => d => d.date, []);

  const yValue = useMemo(() => d => d.deathTotal, []);

  const xScale = useMemo(() => 
    scaleTime()
      .domain(extent(allData, xValue))
      .range([0, innerWidth]), 
    [allData, innerWidth, xValue]);

  const yScale = useMemo(() => 
    scaleLog()
      .domain([epsilon, max(allData, yValue)])
      .range([innerHeight, 0]),
    [allData, innerHeight, yValue]);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        <text
          className='title'
          transform={`translate(${innerWidth / 2}, -10)`}
          textAnchor='middle'
        >
          Global Coronavirus Deaths Over Time By Country
        </text>
        <VoronoiOverlay
          onHover={handleVoronoiHover}
          allData={allData}
          innerWidth={innerWidth}
          innerHeight={innerHeight}
          xScale={xScale}
          yScale={yScale}
          xValue={xValue}
          yValue={yValue}
          epsilon={epsilon}
          margin={margin}
        />
        <BottomAxis
          xScale={xScale}
          innerHeight={innerHeight}
          tickFormat={xAxisTickFormat}
          tickOffset={7}
        />
        <text
          className="axis-label"
          textAnchor='middle'
          transform={`translate(${-yLabelOffset}, ${innerHeight / 2}) rotate(-90)`}
        >{yAxisLabel}
        </text>
        <LeftAxis
          yScale={yScale}
          innerWidth={innerWidth}
          tickOffset={7}
        />
        <text
          className="axis-label"
          x={innerWidth / 2}
          y={innerHeight + xLabelOffset}
          textAnchor='middle'
        >{xAxisLabel}</text>
        <YMarkerline
          value={5000000}
          yScale={yScale}
          innerWidth={innerWidth}
        />
        <Marks
          data={data}
          active={activeRow}
          xScale={xScale}
          yScale={yScale}
          xValue={xValue}
          yValue={yValue}
          epsilon={epsilon}
          formatDate={xAxisTickFormat}
        />
      </g>
    </svg>
  )
}