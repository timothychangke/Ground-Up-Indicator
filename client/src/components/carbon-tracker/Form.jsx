import { useState } from 'react';
import { useForm } from 'react-hook-form';
import List from './List';
import { default as api } from '../../store/apiSlice.js';
import {
    transportEmissions,
    wasteEmissions,
    electricityEmissions,
} from '../../data/emissions';
import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dataProcessing from '../../utils/carbonTracker';
import { useContext } from 'react';
import { UserContext } from '../../context/userContext';
import dayjs from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers';
import axios from 'axios';

export default function Form() {
    const [activityType, setActivityType] = useState('');
    const { register, handleSubmit, resetField } = useForm();
    const [addActivity] = api.useAddActivityMutation();
    const [time, setTime] = useState({
        startTime: dayjs('2024-02-12T00:00'),
        endTime: dayjs('2024-02-12T00:00'),
    });

    const { user, setUser } = useContext(UserContext);
    if (!user) {
        axios.get('/profile').then(({ data }) => {
            setUser(data);
        });
    }
    console.log(user);

    const onSubmit = async (data) => {
        if (!data) return;
        const newData = {
            name: data.name,
            user: user['name'],
            type: data.type,
            amount: dataProcessing(data, time),
            startDate: time.startTime,
            endDate: time.endTime,
        };
        await addActivity(newData).unwrap();
        resetField('name');
        resetField('type');
        resetField('subType');
        resetField('weight');
        setActivityType('');
        setTime({
            startTime: dayjs('2024-02-12T00:00'),
            endTime: dayjs('2024-02-12T00:00'),
        });
    };
    return (
        <div className="form max-w-sm mx-auto w-96">
            <h1 className="font-bold pb-4 text-xl">Log Carbon Activities</h1>
            <form id="form" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-4">
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Name of activity..."
                            className="form-input py-3"
                            {...register('name')}
                        />
                    </div>
                    <select
                        className="form-input py-3"
                        {...register('type')}
                        placeholder="mode of transport"
                        onChange={(event) =>
                            setActivityType(event.target.value)
                        }
                    >
                        <option value="Activity type...">
                            Activity type...
                        </option>
                        <option value="Transportation">Transportation</option>
                        <option value="Electricity">Electricity</option>
                        <option value="Waste">Waste</option>
                    </select>

                    {activityType == 'Transportation' ? (
                        <>
                            <select
                                className="form-input py-3"
                                {...register('subType')}
                            >
                                <option value="">Mode of Transport...</option>
                                {transportEmissions.map((transportMode) => (
                                    <option
                                        value={transportMode.name}
                                        key={transportMode.name}
                                    >
                                        {transportMode.name}
                                    </option>
                                ))}
                            </select>
                            <div className="px-16">
                                <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                >
                                    <DemoContainer components={['TimePicker']}>
                                        <DateTimePicker
                                            label="Start Time"
                                            onChange={(newValue) => {
                                                setTime({
                                                    ...time,
                                                    startTime: newValue,
                                                });
                                            }}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </div>
                            <div className="px-16">
                                <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                >
                                    <DemoContainer components={['TimePicker']}>
                                        <DateTimePicker
                                            label="End Time"
                                            onChange={(newValue) => {
                                                setTime({
                                                    ...time,
                                                    endTime: newValue,
                                                });
                                            }}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </div>
                        </>
                    ) : (
                        ''
                    )}

                    {activityType == 'Electricity' ? (
                        <>
                            <select
                                className="form-input py-3"
                                {...register('subType')}
                            >
                                <option value="">Type of use...</option>
                                {electricityEmissions.map((use) => (
                                    <option value={use.type} key={use.type}>
                                        {use.type}
                                    </option>
                                ))}
                            </select>
                            <div className="px-16">
                                <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                >
                                    <DemoContainer components={['TimePicker']}>
                                        <TimePicker
                                            label="Start Time"
                                            onChange={(newValue) => {
                                                setTime({
                                                    ...time,
                                                    startTime: newValue,
                                                });
                                            }}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </div>
                            <div className="px-16">
                                <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                >
                                    <DemoContainer components={['TimePicker']}>
                                        <TimePicker
                                            label="End Time"
                                            onChange={(newValue) => {
                                                setTime({
                                                    ...time,
                                                    endTime: newValue,
                                                });
                                            }}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </div>
                        </>
                    ) : (
                        ''
                    )}
                    {activityType == 'Waste' ? (
                        <>
                            <select
                                className="form-input py-3"
                                {...register('subType')}
                            >
                                <option value="">Type of Waste...</option>
                                {wasteEmissions.map((waste) => (
                                    <option value={waste.type} key={waste.type}>
                                        {waste.type}
                                    </option>
                                ))}
                            </select>
                            <div className="input-group">
                                <input
                                    type="text"
                                    placeholder="Weight (in grams)"
                                    className="form-input py-3"
                                    {...register('weight')}
                                />
                            </div>
                        </>
                    ) : (
                        ''
                    )}
                    {activityType == 'Transportation' ||
                    activityType == 'Electricity' ||
                    activityType == 'Waste' ? (
                        <div className="submit-btn">
                            <button
                                type="submit"
                                className="border py-2 text-white bg-indigo-500 w-full"
                            >
                                Track Carbon!
                            </button>
                        </div>
                    ) : (
                        ''
                    )}
                </div>
            </form>
            <List />
        </div>
    );
}
