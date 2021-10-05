export const BottomAxis = ({xScale, innerHeight}) =>
  xScale.ticks().map(tick => (
    <g key={tick} transform={`translate(${xScale(tick)},0)`}>
      <line
        y2={innerHeight}
        stroke="black"
      />
      <text 
        style={{textAnchor: 'middle'}}
        y={innerHeight + 3}
        dy="0.71em"
      >{tick}</text>
    </g>
  ))