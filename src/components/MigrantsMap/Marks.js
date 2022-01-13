import { geoConicEquidistant, geoPath, geoGraticule } from 'd3';

const projection = geoConicEquidistant();
const path = geoPath(projection);
const graticule = geoGraticule();


export const Marks = ({ lands: {land, interiors}, data, sizeScale, sizeValue }) => (
  <g className="marksmap">
    <path className="sphere" d={path({type: 'Sphere'})} />
    <path className="graticules" d={path(graticule())} />
    {
      land.features.map( feature => (
        <path className="land" d={path(feature)} />
      ))
    }
    <path className="interiors" d={path(interiors)} />
    {data.map(d => {
      const [x, y] = projection(d.loc)
      return <circle className='mapcircle' cx={x} cy={y} r={sizeScale(sizeValue(d))}/>
    })}
  </g>
)