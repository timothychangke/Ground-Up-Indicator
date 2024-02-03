export const transportEmissions = [
    {
        name: 'Gasoline Car',
        type: 'Land',
        carbonPerKM: 192,
        speedKMperHour: 50,
    },
    {
        name: 'Small Gasoline Car',
        type: 'Land',
        carbonPerKM: 96,
        speedKMperHour: 60,
    },
    {
        name: 'Diesel Car',
        type: 'Land',
        carbonPerKM: 171,
        speedKMperHour: 60,
    },
    {
        name: 'Bus',
        type: 'Land',
        carbonPerKM: 105,
        speedKMperHour: 40,
    },
    {
        name: 'Motorcycle',
        type: 'Land',
        carbonPerKM: 103,
        speedKMperHour: 70,
    },

    {
        name: 'Electric Vehicle',
        type: 'Land',
        carbonPerKM: 53,
        speedKMperHour: 75,
    },
    {
        name: 'Train',
        type: 'Land',
        carbonPerKM: 41,
        speedKMperHour: 75,
    },
    {
        name: 'Short Haul Flight',
        type: 'Air',
        carbonPerKM: 255,
        speedKMperHour: 800,
    },
    {
        name: 'Medium Haul Flight',
        type: 'Air',
        carbonPerKM: 156,
        speedKMperHour: 800,
    },
    {
        name: 'Long Haul Flight',
        type: 'Air',
        carbonPerKM: 150,
        speedKMperHour: 900,
    },
    {
        name: 'Ferry',
        type: 'Sea',
        carbonPerKM: 19,
        speedKMperHour: 30,
    },
];

export const wasteEmissions = [
    {
        type: 'Plastics',
        carbonPerKG: 6000,
    },
    {
        type: 'Wood',
        carbonPerKG: 1850,
    },
    {
        type: 'Metal',
        carbonPerKG: 6150,
    },
    {
        type: 'Food',
        carbonPerKG: 1900,
    },
    {
        type: 'Glass',
        carbonPerKG: 1437,
    },
    {
        type: 'Fabric',
        carbonPerKG: 3169,
    },
    {
        type: 'Electronics',
        carbonPerKG: 1440,
    },
];

export const electricityEmissions = [
    { type: 'Portable Heaters', carbonPerHour: 400 },
    { type: 'Water Heaters', carbonPerHour: 1800 },
    { type: 'Air Conditioning', carbonPerHour: 800 },
    { type: 'Refrigerators', carbonPerHour: 33.4 },
    { type: 'Dryers', carbonPerHour: 1000 },
    { type: 'Lighting', carbonPerHour: 6.4 },
    { type: 'Cooking Appliances', carbonPerHour: 1 },
    { type: 'Computers', carbonPerHour: 0.3 },
];
