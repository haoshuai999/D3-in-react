export const YMarkerline = ({ value, yScale, innerWidth }) => {
    const markerX1 = 0;
    const markerX2 = innerWidth;
    const markerY = yScale(value)
    const markerTxtY = yScale(value + 100000)

    return (
        <>
            <line
            className='marker'
            x1={markerX1}
            x2={markerX2}
            y1={markerY}
            y2={markerY}
            />
            <text
            className='marker-text'
            x={markerX2} 
            y={markerTxtY}>
            5,000,000
            </text>
        </>
    )
}