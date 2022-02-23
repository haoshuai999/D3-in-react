import { line, curveNatural } from 'd3';

export const Marks = ({data, xScale, yScale, xValue, yValue}) => (
  <g className="marks">
    <path 
      fill = 'none'
      stroke = 'red'
      d = {
        line()
        //.curve(curveNatural)
        .x(d => xScale(xValue(d)))
        .y(d => yScale(yValue(d)))
        (data)
      } 
    />
  </g>
)