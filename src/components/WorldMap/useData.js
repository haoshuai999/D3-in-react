import {useState, useEffect} from 'react';
import { json } from 'd3';
import { feature } from 'topojson-client';

export const useData = (dataUrl) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        json(dataUrl).then(topojsonData => {
            const { countries } = topojsonData.objects;
            setData(feature(topojsonData, countries))
        });
    }, []);

    return data;
}