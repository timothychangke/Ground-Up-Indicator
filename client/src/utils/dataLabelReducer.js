export default function labelReducer(data) {
    let transportTotal = 0;
    let electricityTotal = 0;
    let wasteTotal = 0;
    let totalSum = 0;
    for (let entry of data) {
        if (entry.type == 'Transportation') {
            transportTotal += Number(entry.amount);
        } else if (entry.type == 'Electricity') {
            electricityTotal += Number(entry.amount);
        } else {
            wasteTotal += Number(entry.amount);
        }
    }
    totalSum = transportTotal + electricityTotal + wasteTotal;

    return [
        {
            type: 'Transportation',
            amount: transportTotal,
            percentage: ((transportTotal / totalSum) * 100).toFixed(1),
        },
        {
            type: 'Electricity',
            amount: electricityTotal,
            percentage: ((electricityTotal / totalSum) * 100).toFixed(1),
        },
        {
            type: 'Waste',
            amount: wasteTotal,
            percentage: ((wasteTotal / totalSum) * 100).toFixed(1),
        },
    ];
}
