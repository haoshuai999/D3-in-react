import {useState, useEffect} from 'react';
import { csv } from 'd3';

export const useData = (dataUrl) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const row = d => {
            d.temperature = +d.temperature;
            d.timestamp = new Date(d.timestamp)
            return d;
        };
        csv(dataUrl, row).then(setData);
    }, []);

    return data;
}