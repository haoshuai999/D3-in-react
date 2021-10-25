import {useState, useEffect} from 'react';
import { csv } from 'd3';

export const useIrisData = (dataUrl) => {
    const [iris, setIris] = useState(null);

    useEffect(() => {
        const row = d => {
            d.sepal_length = +d.sepal_length;
            d.sepal_width = +d.sepal_width;
            d.petal_length = +d.petal_length;
            d.petal_width = +d.petal_width;
            return d;
        };
        csv(dataUrl, row).then(setIris);
    }, []);

    return iris;
}