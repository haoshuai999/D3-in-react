import { useEffect, useRef } from 'react';
import { force } from './generateForce';

const width = 960;
const height = 960;

const Force = () => {
    useEffect(() => {
        force(width, height);
    }, []);

    return (
        <svg id="container" width={width} height={height}></svg>
    )
}

export default Force;