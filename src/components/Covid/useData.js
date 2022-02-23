import { useState, useEffect } from 'react';
import { csv, timeParse } from 'd3';

const sum = (accu, current) => accu + current;
const parseDate = timeParse("%m/%d/%y");

const transform = raw => {
    const days = raw.columns.slice(4);
    return days.map(day => ({
        date: parseDate(day),
        deathTotal: raw.map(d => +d[day]).reduce(sum, 0)
    })
    )
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