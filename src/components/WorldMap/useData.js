import {useState, useEffect} from 'react';
import { json } from 'd3';
import { feature, mesh } from 'topojson-client';

export const useData = (dataUrl) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        json(dataUrl).then(topojsonData => {
            const { countries, land } = topojsonData.objects;
            setData({
                land: feature(topojsonData, land),
                interiors: mesh(topojsonData, countries, (a, b) => a !== b)
            })
        });
    }, []);

    return data;
}