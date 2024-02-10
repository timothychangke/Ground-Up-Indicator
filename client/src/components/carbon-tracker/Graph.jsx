import React, { useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
import Labels from './Labels';
import processChartData from '../../utils/processChartData';
import { default as api } from '../../store/apiSlice';
import { useContext, useRef } from 'react';
import { UserContext } from '../../context/userContext.jsx';
import getTotal from '../../utils/getTotal';
import axios from 'axios';

Chart.register(ArcElement);

export default function Graph() {
    const { user,userDispatch } = useContext(UserContext);
    const { data, isFetching, isSuccess, isError } =
    api.useGetActivityQuery(user);
    useEffect(()=>{
        async function fetchUser(){
    if (user == null){
        await axios.get('/profile').then(({ data }) => {
            userDispatch({
                type: 'SET_USERS',
                payload: data,
            });
        });
    }
}
},[user,userDispatch])

    if (!user){
        return <div>Loading...</div>
    }

    let graphData;
    if (isFetching) {
        graphData = <div>Loading...</div>;
    } else if (isSuccess) {
        graphData = <Doughnut {...processChartData(data)}></Doughnut>;
    } else if (isError) {
        graphData = <div>Error</div>;
    }
    const total = getTotal(data);
    return (
        <div className="flex justify-content max-w-xs mx-auto">
            <div className="item">
                <div className="chart relative">
                    {graphData}
                    <h3 className="mb-4 font-bold title">
                        Total
                        <span className="block text-3xl text-emerald-400">
                            {total}g
                        </span>
                    </h3>
                </div>
                <div className="flex flex-col py-10 gap-4">
                    <Labels />
                </div>
            </div>
        </div>
    );
}
