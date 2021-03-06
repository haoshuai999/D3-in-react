import { useRef, useEffect, useMemo } from 'react';
import { extent, scaleTime, scaleLinear, timeFormat, bin, timeMonths, sum, max, brushX, select } from 'd3';
import { LeftAxis } from './LeftAxis';
import { BottomAxis } from './BottomAxis';
import { Bins } from './Bins';

const margin = { top: 10, right: 30, bottom: 20, left: 50 };

const xLabelOffset = 35;
const yLabelOffset = 40;

const xAxisLabel = 'Time';
const xAxisTickFormat = timeFormat("%m/%d/%Y");

const yValue = d => d["Total Dead and Missing"];
const yAxisLabel = 'Total Dead and Missing';

const Migrants = ({ data, width, height, setBrushExtent, xValue }) => {

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;


  const xScale = useMemo(
    () => scaleTime()
        .domain(extent(data, xValue))
        .range([0, innerWidth])
        .nice(), 
    [data, xValue, innerWidth]
  )

  const binnedData = useMemo(() => {
    const [start, stop] = xScale.domain()
    return bin()
      .value(xValue)
      .domain(xScale.domain())
      .thresholds(timeMonths(start, stop))(data)
      .map(array => ({
        y: sum(array, yValue),
        x0: array.x0,
        x1: array.x1
      }))
    },
    [xValue, yValue, xScale, data])

  const yScale = useMemo(() => scaleLinear()
    .domain([0, max(binnedData, d => d.y)])
    .range([innerHeight, 0])
    .nice(),
    [binnedData, innerHeight]
  );
  
  const brushRef = useRef();

  useEffect(() => {
    const brush = brushX().extent([[0,0], [innerWidth, innerHeight]]);
    
    brush(select(brushRef.current));
    brush.on("brush end", (event) => {
      setBrushExtent(event.selection && event.selection.map(xScale.invert));
    });
  }, [innerWidth, innerHeight]);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
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
          x={innerWidth / 2 } 
          y={innerHeight + xLabelOffset} 
          textAnchor='middle'
        >{xAxisLabel}</text>
        <Bins 
          data={binnedData} 
          xScale={xScale} 
          yScale={yScale} 
          tooltipFormat={d => d}
          innerHeight={innerHeight}
        />
        <g ref={brushRef}/>
      </g>
    </svg>
  )
}

export default Migrants;