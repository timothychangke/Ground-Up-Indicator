import labelReducer from './dataLabelReducer';

export default function processChartData(transaction) {
    const dataArr = labelReducer(transaction).map((ele) => ele.amount);
    const config = {
        data: {
            datasets: [
                {
                    data: dataArr,
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 205, 86)',
                    ],
                    hoverOffset: 4,
                    borderRadius: 30,
                    spacing: 10,
                },
            ],
        },
        options: {
            cutout: 115,
        },
    };
    return config;
}
