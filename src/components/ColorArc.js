import React, {useState, useEffect} from 'react';
import { ReactDOM } from 'react';
import { csv, arc } from 'd3';

const corshead = "https://observable-cors.glitch.me/"
const dataUrl = corshead + "https://gist.githubusercontent.com/curran/b236990081a24761f7000567094914e0/raw/acd2b8cecfe51c520622fbaf407ee88b8796bfc6/cssNamedColors.csv";

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

  console.log(color)

  if (!color) {
    return <pre>Loading...</pre>
  }

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${centerX},${centerY})`}>
        {
          color.map((d, i) => (
            <path 
              fill={d['RGB hex value']} 
              d={pathArc({
                startAngle: i / color.length * 2 * Math.PI,
                endAngle: (i+1) / color.length * 2 * Math.PI
               })}
            />
          ))
        }
      </g>
    </svg>
  )
}

export default ColorArc;