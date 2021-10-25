export const NewLeftAxis = ({yScale, innerWidth}) => 
yScale.ticks().map(tick => (
  <g className="tick" key={tick} transform={`translate(0, ${yScale(tick)})`}>
    <line x2={innerWidth} />
    <text 
      style={{textAnchor: 'end'}}
      x={-3}
      y={yScale(tick)} 
      dy="0.32em"
    >{tick}</text>
  </g>
))