import {
    transportEmissions,
    electricityEmissions,
    wasteEmissions,
} from '../data/emissions';

import dayjs from 'dayjs';

export default function dataProcessing(data, time) {
    const timeDuration = time.endTime.diff(time.startTime, 'minutes');
    if (data.type == 'Transportation') {
        const emissionsEntity = transportEmissions.find(
            ({ name }) => name == data.subType
        );
        const { carbonPerKM, speedKMperHour } = emissionsEntity;
        const carbonOutput =
            (Number(speedKMperHour) / 60) *
            Number(timeDuration) *
            Number(carbonPerKM);
        return carbonOutput;
    } else if (data.type == 'Electricity') {
        const emissionsEntity = electricityEmissions.find(
            ({ type }) => type == data.subType
        );
        const { carbonPerHour } = emissionsEntity;
        const carbonOutput =
            Number(timeDuration) * (Number(carbonPerHour) / 60);
        return carbonOutput;
    } else {
        const emissionsEntity = wasteEmissions.find(
            (waste) => waste.type == data.subType
        );
        const { carbonPerKG } = emissionsEntity;
        const carbonOutput = (Number(carbonPerKG) / 1000) * Number(data.weight);
        return carbonOutput;
    }
}
