import {useState, useEffect} from 'react';
import { csv } from 'd3';

export const useData = (dataUrl) => {
    const [bar, setBar] = useState(null);

    useEffect(() => {
        const row = d => {
            d.Population = +d["2020"] * 1000;
            return d;
        };
        csv(dataUrl, row).then(bar => {
            setBar(bar.slice(0, 10))
        });
    }, []);

    return bar;
}