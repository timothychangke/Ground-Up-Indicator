import { Radar } from 'react-chartjs-2';
import {
    Chart as Chartjs,
    LineElement,
    PointElement,
    Tooltip,
    Legend,
    RadialLinearScale,
    Filler
} from 'chart.js';
Chartjs.register(LineElement, PointElement, Tooltip, Legend, RadialLinearScale,Filler);


export default function RadarGraph({ graphData }) {
    const dataset = factorData(graphData);
    const data = {
        labels: ['Nature', 'Carbon', 'Reflections'],
        datasets: dataset,
    };
    const options={}
    return (
        <div style={{width:'500px', padding:'20px'}}>
            <Radar data={data} options={options}></Radar>
        </div>
    );
}

function factorData(data) {
    const { natureScoreArray, carbonScoreArray, nlpScoreArray, dateArray } =
        data;
        

    const datasets = dateArray.map((date, index) => {
        const dateObj = new Date(date);
        // Format the date
        const formattedDate = dateObj.toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
        const hue = Math.floor(Math.random() * 360); // Random hue
        const saturation = 80 + Math.floor(Math.random() * 21); // Random saturation between 80 and 100
        const lightness = 50 + Math.floor(Math.random() * 21); // Random lightness between 50 and 70
        const vibrantColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        return {
            label: formattedDate,
            data: [
            
                natureScoreArray[index],
                carbonScoreArray[index],
                nlpScoreArray[index],
            ],
            backgroundColor: vibrantColor,
            borderColor:'black',
        };
    });

    return datasets;
}

