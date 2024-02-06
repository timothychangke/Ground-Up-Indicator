import {
    Chart as Chartjs,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from 'chart.js';
import calculateLabels from '../utils/calculateLabels';
import { Bar } from 'react-chartjs-2';
import { useEffect, useState } from 'react';

Chartjs.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function NatureGraph({ natures }) {
    if (natures === null || natures === undefined) {
        return <div>Loading...</div>; // Render a loading state
    }

    const { dateArray, durationArray } = calculateLabels(natures);

    const options = {
        scales: {
            x: {
                grid: {
                    display: false, 
                },
            },
            y: {
                grid: {
                    display: false,
                },
            },
        },
        animation: {
            duration: 1500, 
        },
    };
    const data = {
        labels: dateArray,
        datasets: [
            {
                label: 'Date',
                data: durationArray,
                backgroundColor: 'white',
                borderColor: 'black',
                borderWidth: 1,
            },
        ],
    };

    return <Bar data={data} options={options}></Bar>;
}
