export const BottomAxis = ({xScale, innerHeight, tickFormat}) =>
  xScale.ticks().map(tick => (
    <g className="tick" key={tick} transform={`translate(${xScale(tick)},0)`}>
      <line
        y2={innerHeight}
      />
      <text 
        style={{textAnchor: 'middle'}}
        y={innerHeight + 3}
        dy="0.71em"
      >{tickFormat(tick)}</text>
    </g>
  ))