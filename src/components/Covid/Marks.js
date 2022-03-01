import { line } from 'd3';

export const Marks = ({ data, active, xScale, yScale, xValue, yValue, epsilon }) => (
  <g className="marks">
    {
      data.map(country => {
        return <path
          fill='none'
          stroke='blue'
          opacity={0.4}
          d={
            line()
              .x(d => xScale(xValue(d)))
              .y(d => yScale(epsilon + yValue(d)))
              (country)
          }
        />
      })
    }
    {active ?
      <path
        fill='none'
        stroke='blue'
        opacity={0.4}
        className='active'
        d={
          line()
            .x(d => xScale(xValue(d)))
            .y(d => yScale(epsilon + yValue(d)))
            (data.find(country => country.countryName === active))
        }
      /> : null
    }
  </g>
)