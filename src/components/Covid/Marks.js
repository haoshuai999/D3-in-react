import { line, format } from 'd3';

const formatNumber = format(",")

export const Marks = ({ data, active, xScale, yScale, xValue, yValue, epsilon, formatDate }) => (
  <g className="marks">
    {
      data.map(country => {
        return <path
          fill='none'
          stroke='gray'
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
      <>
        <path
          fill='none'
          stroke='black'
          opacity={0.4}
          className='active'
          d={
            line()
              .x(d => xScale(xValue(d)))
              .y(d => yScale(epsilon + yValue(d)))
              (data.find(country => country.countryName === active.countryName))
          }
        />
        <g transform={`translate(${xScale(xValue(active))}, ${yScale(epsilon + yValue(active))})`}>
          <circle
            className='covid-circle'
            r={5}
          />
          <text
            className='tooltips-stroke'
            x={-10}
            textAnchor='end'
          >
            {`${active.countryName}: ${formatNumber(active.deathTotal)} as of ${formatDate(active.date)}`}
          </text>
          <text
            className='tooltips'
            x={-10}
            textAnchor='end'
          >
            {`${active.countryName}: ${formatNumber(active.deathTotal)} as of ${formatDate(active.date)}`}
          </text>
        </g>
      </> : null
    }
  </g>
)