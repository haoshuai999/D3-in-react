import { useState, useEffect } from 'react';
import { csv, timeParse } from 'd3';

const sum = (accu, current) => accu + current;
const parseDate = timeParse("%m/%d/%y");

const transform = raw => {
    const countryData = raw.filter(d => !d['Province/State'])

    const days = raw.columns.slice(4);
    return countryData.map(d => {
        const countryName = d['Country/Region'];
        return days.map(day => ({
            date: parseDate(day),
            deathTotal: +d[day]
        }))
    })

};

export const useData = (dataUrl) => {
    const [data, setData] = useState(null);
    //console.log(data)

    useEffect(() => {
        csv(dataUrl).then(raw => {
            setData(transform(raw))
        });
    }, []);

    return data;
}