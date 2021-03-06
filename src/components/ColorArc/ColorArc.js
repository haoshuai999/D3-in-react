import React, {useState, useEffect} from 'react';
import { ReactDOM } from 'react';
import { csv, arc, pie } from 'd3';

const dataUrl = "https://gist.githubusercontent.com/curran/b236990081a24761f7000567094914e0/raw/acd2b8cecfe51c520622fbaf407ee88b8796bfc6/cssNamedColors.csv";

const width = 960;
const height = 500;
const centerX = width / 2;
const centerY = height / 2;

const pathArc = arc()
  .innerRadius(0)
  .outerRadius(width);

const ColorArc = () => {
  const [color, setColor] = useState(null);

  useEffect(() => {
    csv(dataUrl).then(setColor);
  }, [])


  if (!color) {
    return <pre>Loading...</pre>
  }

  const coloredPie = pie().value(1)

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${centerX},${centerY})`}>
        {
          coloredPie(color)
          .map((d, i) => (
            <path
              key= {i}
              fill= {d.data['RGB hex value']}
              d={pathArc(d)}
            />
          ))
        }
      </g>
    </svg>
  )
}

export default ColorArc;