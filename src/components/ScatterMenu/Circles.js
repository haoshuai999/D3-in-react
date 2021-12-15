export const Circles = ({data, xScale, yScale, xValue, yValue, colorScale, colorValue, tooltipFormat, radius}) =>
data.map(d => (
    <circle
      className="mark"
      cx={xScale(xValue(d))}
      cy={yScale(yValue(d))}
      fill={colorScale(colorValue(d))}
      r={radius}
    >
      <title>{tooltipFormat(xValue(d))}</title>
    </circle>
))