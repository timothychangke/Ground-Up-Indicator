export default function getTotal(data) {
    var total = 0;
    for (let i in data) {
        total += Number(data[i].amount);
    }
    return total.toFixed(1);
}
