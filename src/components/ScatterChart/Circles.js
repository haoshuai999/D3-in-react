export const Circles = ({data, xScale, yScale, xValue, yValue, tooltipFormat, radius}) =>
data.map((d, i) => (
    <circle
      className="mark"
      key={i}
      cx={xScale(xValue(d))}
      cy={yScale(yValue(d))}
      r={radius}
    >
      <title>{tooltipFormat(xValue(d))}</title>
    </circle>
))