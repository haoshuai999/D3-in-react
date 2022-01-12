import { line, curveNatural } from 'd3';

export const Bins = ({data, xScale, yScale, tooltipFormat, innerHeight}) => (
  data.map(d => (
    <rect
      className='marks-rect'
      x={xScale(d.x0)}
      y={yScale(d.y)}
      width={xScale(d.x1) - xScale(d.x0)}
      height={innerHeight - yScale(d.y)}
    >
      <title>{tooltipFormat(d.y)}</title>
    </rect>
  ))
)