import { useState, useEffect } from 'react';
import { csv } from 'd3';

const row = d => {
    d.lat = +d.lat
    d.lng = +d.lng

    return d
}

export const useCity = (dataUrl) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        csv(dataUrl, row).then(setData);
    }, []);

    return data;
}