import { useState, useEffect } from 'react';
import { csv } from 'd3';

const row = d => {
    d.loc = d["Location Coordinates"].split(",").map(d => +d).reverse();
    d["Total Dead and Missing"] = +d["Total Dead and Missing"]

    return d
}

export const useData = (dataUrl) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        csv(dataUrl, row).then(setData);
    }, []);

    return data;
}