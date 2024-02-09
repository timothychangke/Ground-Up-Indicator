import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/userContext';
import NatureTrackerForm from '../components/NatureTrackerForm';
import { NatureContext } from '../context/natureContext';
import '../styles/tracker.css';
import NatureGraph from '../components/NatureGraph';
export default function NatureTracker() {
    const { natures, dispatch } = useContext(NatureContext);
    const { user, setUser } = useContext(UserContext);
    useEffect(() => {
        if (!user) {
            axios.get('/profile').then(({ data }) => {
                setUser(data);
            });
        }
    }, []);

    useEffect(() => {
        const object = { email: user.email };
        axios
            .get('/nature', { params: object })
            .then((res) => {
                dispatch({
                    type: 'SET_NATURES',
                    payload: res.data,
                });
            })
            .catch((error) => {
                console.error('Error fetching nature:', error);
            });
    }, [user, dispatch]);

    return (
        <div className="container mx-auto max-w-6xl text-center drop-shadow-lg text-gray-800">
            <h1 className="text-4xl py-8 mb-10 bg-custom-emerald text-white rounded">
                Nature Tracker
            </h1>
            <div className="grid md:grid-cols-2 gap-4">
                <div >
            <NatureGraph natures={natures} />
            </div>
                <NatureTrackerForm />

                <div className="flex flex-col py-6 gap-3">
                    <h1 className="py-4 text-md font-bold text-xl">History</h1>
                    {natures ? (
                        <>
                            {natures.map((activity) => (
                                <NatureActivity
                                    key={activity._id}
                                    activity={activity}
                                />
                            ))}
                        </>
                    ) : (
                        <h2>empty</h2>
                    )}
                </div>
            </div>
        </div>
    );
}

function NatureActivity({ activity }) {
    const { dispatch } = useContext(NatureContext);

    const handleDelete = (id) => {
        axios.delete(`/nature/${id}`).then((e) => {
            dispatch({
                type: 'DELETE_NATURE',
                payload: e.data,
            });
        });
    };

    return (
        <div className="activity-box">
            <button onClick={(e) => handleDelete(activity._id)}>
                <box-icon name="trash" size="15px" />
            </button>
            <span className="block w-full">{activity.activity}</span>
        </div>
    );
}
