export const LeftAxis = ({yScale}) => 
yScale.domain().map(tick => (
  <g className="tick">
    <text 
      key={tick}
      style={{textAnchor: 'end'}}
      x={-3}
      y={yScale(tick) + yScale.bandwidth() / 2}
      dy="0.32em"
    >{tick}</text>
  </g>
))