import React, { useState } from 'react';
import { extent, scaleOrdinal, scaleLinear, format } from 'd3';
import ReactDropdown from "react-dropdown";
import 'react-dropdown/style.css';
import { useIrisData } from "./useIrisData";
import { NewLeftAxis } from './NewLeftAxis';
import { NewBottomAxis } from './NewBottomAxis';
import { Circles } from './Circles';
import { isCompositeComponent } from 'react-dom/cjs/react-dom-test-utils.production.min';

const width = 960;
const menuHeight = 50;
const height = 500 - menuHeight;
const margin = { top: 20, right: 20, bottom: 50, left: 100 };

const options = [
  { value: "sepal_length", label: "Sepal Length" }, 
  { value: "sepal_width", label: "Sepal Width" },
  { value: "petal_length", label: "Petal Length" }, 
  { value: "petal_width", label: "Petal Width" },
  { value: "species", label: "Species" }, 
];

const dataUrl = "https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/0e7a9b0a5d22642a06d3d5b9bcbad9890c8ee534/iris.csv";

const getLabel = value => {
  for(let i = 0; i < options.length; i++){
    if(options[i].value === value) {
      return options[i].label
    }
  }
}

const ScatterChart = () => {

  const iris = useIrisData(dataUrl);
  
  const initX = 'petal_length';
  const [xAttr, setXAttr] = useState(initX);
  const xValue = d => d[xAttr];
  const xAxisLabel = getLabel(xAttr);

  const initY = 'sepal_width'
  const [yAttr, setYAttr] = useState(initY);
  const yValue = d => d[yAttr];
  const yAxisLabel = getLabel(yAttr);

  const colorValue = d => d.species;

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

  const colorScale = scaleOrdinal()
    .domain(iris.map(colorValue))
    .range(["#1ECBE1", "#E11ECB", "#CBE11E"]);

  const xLabelOffset = 35;
  const yLabelOffset = 35;
  const xAxisTickFormat = tickValue => format(".2s")(tickValue).replace('G','B');

  return (
    <>  
        <div className='dropdown-align'>
          <span className='p-2 dropdown-label'>X</span>
          <ReactDropdown 
              options={options} 
              value = {xAttr}
              onChange={({value}) => setXAttr(value)}
          />
          <span className='p-2 ml-2 dropdown-label'>Y</span>
          <ReactDropdown 
              options={options} 
              value = {yAttr}
              onChange={({value}) => setYAttr(value)}
          />
        </div>
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
              colorScale={colorScale}
              colorValue={colorValue}
              tooltipFormat={xAxisTickFormat}
              radius={7}
            />
        </g>
        </svg>
    </>
  )
}

export default ScatterChart;
