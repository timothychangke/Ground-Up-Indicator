import axios from 'axios';
import { useContext, useState } from 'react';
import { UserContext } from '../context/userContext.jsx';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { NatureContext } from '../context/natureContext.jsx';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo/DemoContainer.js';

export default function NatureTrackerForm() {
    const { user } = useContext(UserContext);
    const [activity, setActivity] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const { dispatch } = useContext(NatureContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const startObject = new Date(Date.parse(startDate));
        const endObject = new Date(Date.parse(endDate));
        const object = {
            email: user.email,
            activity: activity,
            startDate: startObject,
            endDate: endObject,
            duration:
                ((endObject.getTime() - startObject.getTime())/ 60000) ,
        };
        axios.post('/nature', object).then((e) => {
            dispatch({
                type: 'CREATE_NATURE',
                payload: e.data,
            });
            setStartDate('');
            setActivity('');
            setEndDate('');
            document.getElementById('activity').value=''
            document.getElementById('startDate').value=''
            document.getElementById('endDate').value=''
        });
    };

    return (
        <div className="form max-w-sm mx-auto w-96">
            <h1 className="font-bold pb-4 text-xl">
                Log time spent in Nature 🌲🌳🌿
            </h1>
            <form
                onSubmit={(e) => {
                    handleSubmit(e);
                }}
            >
                <input
                id='activity'
                    type="text"
                    className="form-input py-3"
                    placeholder="Name of activity..."
                    onChange={(e) => {
                        setActivity(e.target.value);
                    }}
                />
                <div className="px-16 py-6">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['TimePicker']}>
                            <DateTimePicker
                            id="startDate"
                                label="Start Date"
                                onChange={(e) => {
                                    setStartDate(e);
                                }}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                </div>
                <div className="px-16 pb-6">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['TimePicker']}>
                            <DateTimePicker
                            id="endDate"
                                label="End Date"
                                onChange={(e) => {
                                    setEndDate(e);
                                }}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                </div>
                <button
                    type="submit"
                    className="border py-2 text-white bg-lime-600 w-full"
                >
                    Track Time Spent in Nature!
                </button>
            </form>
        </div>
    );
}
