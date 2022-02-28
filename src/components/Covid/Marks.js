import { line, curveNatural } from 'd3';

export const Marks = ({data, xScale, yScale, xValue, yValue, epsilon}) => (
  <g className="marks">
    {
      data.map(country => {
        return <path 
          fill = 'none'
          stroke = {`rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`}
          d = {
            line()
            //.curve(curveNatural)
            .x(d => xScale(xValue(d)))
            .y(d => yScale(epsilon + yValue(d)))
            (country)
          } 
        />
      })
    }
  </g>
)