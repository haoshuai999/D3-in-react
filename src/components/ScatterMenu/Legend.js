export const Legend = ({colorScale, legendSpacing = 20, legendSize = 5, legendOffset=5}) => 
    colorScale.domain().map((domainValue, i) => 
    (
        <g className="tick" transform={`translate(0, ${i * legendSpacing})`}>
            <circle 
                fill={colorScale(domainValue)}
                r={legendSize}
            />
            <text 
                x={legendOffset}
                dy="0.32em"
            >{domainValue}</text>
        </g>
    ))