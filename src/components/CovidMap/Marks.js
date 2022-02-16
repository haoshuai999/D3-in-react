import { geoConicEquidistant, geoPath, geoGraticule } from 'd3';

const projection = geoConicEquidistant();
const path = geoPath(projection);
const graticule = geoGraticule();

const missingColor = 'gray'

export const Marks = ({ lands: {countries, interiors}, countryMap, colorScale, colorValue }) => (
  <g className="marksmap">
    <path className="sphere" d={path({type: 'Sphere'})} />
    <path className="graticules" d={path(graticule())} />
    {
      countries.features.map( feature => {
        //console.log(feature.id)
        const d = countryMap.get(feature.id)
        return (
        <path fill={d ? colorScale(colorValue(d)) : missingColor} d={path(feature)} />
      )})
    }
    <path className="interiors" d={path(interiors)} />
  </g>
)