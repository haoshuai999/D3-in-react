import { Delaunay } from 'd3';
import { useMemo } from 'react';

export const VoronoiOverlay = ({ onHover, allData, innerWidth, innerHeight, xScale, yScale, xValue, yValue, epsilon, margin }) => {   
    return useMemo(() => {
        const points = allData.map(d => [xScale(xValue(d)), yScale(epsilon + yValue(d))]);
        const delaunay = Delaunay.from(points);
        const voronoi = delaunay.voronoi([0, 0, innerWidth + margin.right, innerHeight]);

        return <g className='voronoi'>
            {
                points.map((point, i) => (
                    <path
                        onMouseEnter={() => {
                            onHover(allData[i]);
                        }}
                        d={voronoi.renderCell(i)}
                    />
                ))
            }
        </g>
    }, [onHover, allData, innerWidth, innerHeight, xScale, yScale, xValue, yValue, epsilon]);

}