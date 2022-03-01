import { useState, useEffect } from 'react';
import { csv, timeParse } from 'd3';

const parseDate = timeParse("%m/%d/%y");

const transform = raw => {
    const countryData = raw.filter(d => !d['Province/State'])

    const days = raw.columns.slice(4);
    return countryData.map(d => {
        const countryName = d['Country/Region'];
        const countryData = days.map(day => ({
            date: parseDate(day),
            deathTotal: +d[day],
            countryName
        }));

        countryData.countryName = countryName;

        return countryData;
    })

};

export const useData = (dataUrl) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        csv(dataUrl).then(raw => {
            setData(transform(raw))
        });
    }, []);

    return data;
}