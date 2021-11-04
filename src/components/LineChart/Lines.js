import { line, curveNatural } from 'd3';

export const Lines = ({data, xScale, yScale, xValue, yValue, tooltipFormat, radius}) =>
data.map(d => (
  <g className="marks">
    <path 
      fill = 'none'
      stroke = 'red'
      d = {
        line()
        .curve(curveNatural)
        .x(d => xScale(xValue(d)))
        .y(d => yScale(yValue(d)))
        (data)
      } 
    />
    {/* <circle
      cx={xScale(xValue(d))}
      cy={yScale(yValue(d))}
      r={radius}
    >
      <title>{tooltipFormat(xValue(d))}</title>
    </circle> */}
  </g>
))