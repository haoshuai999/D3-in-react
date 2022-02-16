import { useState, useEffect } from 'react';
import { csv } from 'd3';

// const row = d => {
//     d.aids = +d['Prevalence - HIV/AIDS - Sex: Both - Age: 15-49 years (Percent) (%)']

//     return d
// }

const transform = raw => {
    //raw.columns.slice(4)
};

export const useData = (dataUrl) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        csv(dataUrl).then(raw => {
            setData(transform(raw))
        });
    }, []);

    return data;
}