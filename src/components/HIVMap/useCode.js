import { useState, useEffect } from 'react';
import { csv } from 'd3';

export const useCode = (dataUrl) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        csv(dataUrl).then(setData);
    }, []);

    return data;
}