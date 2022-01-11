export const LeftAxis = ({yScale, innerWidth, tickOffset= 3}) => 
yScale.ticks().map(tick => (
  <g className="tick" key={tick} transform={`translate(0, ${yScale(tick)})`}>
    <line x2={innerWidth} />
    <text 
      style={{textAnchor: 'end'}}
      x={-tickOffset}
      y={yScale(tick)} 
      dy="0.32em"
    >{tick}</text>
  </g>
))