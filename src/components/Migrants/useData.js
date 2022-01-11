import {useState, useEffect} from 'react';
import { csv } from 'd3';

export const useData = (dataUrl) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const row = d => {
            d["Total Dead and Missing"] = +d["Total Dead and Missing"];
            d["Reported Date"] = new Date(d["Reported Date"])
            return d;
        };
        csv(dataUrl, row).then(setData);
    }, []);

    return data;
}