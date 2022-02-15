import {useState, useEffect} from 'react';
import { json } from 'd3';
import { feature, mesh } from 'topojson-client';

export const useLand = (dataUrl) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        json(dataUrl).then(topojsonData => {
            const { countries, land } = topojsonData.objects;
            setData({
                countries: feature(topojsonData, countries),
                interiors: mesh(topojsonData, countries, (a, b) => a !== b)
            })
        });
    }, []);

    return data;
}