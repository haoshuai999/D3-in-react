import React from 'react';
import { extent, scaleBand, scaleLinear, format } from 'd3';
import { useIrisData } from "./useIrisData";
import { NewLeftAxis } from './NewLeftAxis';
import { NewBottomAxis } from './NewBottomAxis';
import { Circles } from './Circles';

const width = 960;
const height = 500;
const margin = { top: 20, right: 20, bottom: 50, left: 100 };

const dataUrl = "https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/0e7a9b0a5d22642a06d3d5b9bcbad9890c8ee534/iris.csv";

const xValue = d => d.sepal_length;
const xAxisLabel = 'Sepal Length';

const yValue = d => d.sepal_width;
const yAxisLabel = 'Sepal Width';

const xLabelOffset = 35;
const yLabelOffset = 35;
const xAxisTickFormat = tickValue => format(".2s")(tickValue).replace('G','B');

const ScatterChart = () => {
  const iris = useIrisData(dataUrl);

  if (!iris) {
    return <pre>Loading...</pre>
  }

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xScale = scaleLinear()
    .domain(extent(iris, xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLinear()
    .domain(extent(iris, yValue))
    .range([0, innerHeight]);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        <NewBottomAxis 
          xScale={xScale} 
          innerHeight={innerHeight} 
          tickFormat={xAxisTickFormat}
          tickOffset={5}
        />
        <text 
          className="axis-label" 
          textAnchor='middle'
          transform={`translate(${-yLabelOffset}, ${innerHeight / 2}) rotate(-90)`}
        >{yAxisLabel}
        </text>
        <NewLeftAxis 
          yScale={yScale} 
          innerWidth={innerWidth}
          tickOffset={5}
        />
        <text 
          className="axis-label" 
          x={innerWidth / 2 } 
          y={innerHeight + xLabelOffset} 
          textAnchor='middle'
        >{xAxisLabel}</text>
        <Circles 
          data={iris} 
          xScale={xScale} 
          yScale={yScale} 
          xValue={xValue} 
          yValue={yValue}
          tooltipFormat={xAxisTickFormat}
          radius={7}
        />
      </g>
    </svg>
  )
}

export default ScatterChart;