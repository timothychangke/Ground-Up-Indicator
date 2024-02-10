import axios from 'axios';
import { useContext, useState, useEffect } from 'react';
import { NatureContext } from '../context/natureContext';
import { UserContext } from '../context/userContext';


import { default as api } from '../store/apiSlice';
export default function GetScore() {
    const { natures, dispatch } = useContext(NatureContext);
    const { user, setUser } = useContext(UserContext);
    const [patched, setPatched] = useState(false);
    const [graph,setGraph] = useState(false)
    const [data, setData] = useState(null);
    const [nlp,setNLP]= useState(null)
    if (!natures) {
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
    }
    if (!user) {
        axios.get('/profile').then(({ data }) => {
            setUser(data);
        });
    }

    if (nlp == null){
        const send = {
            email:user.email
        }
        console.log(send)
        axios.get('/reflection',{ params: send }).then((res)=>{
           const nlpscore = (res.data.scoreArray.slice(-1)[0])
            setNLP(nlpscore)
            setTimeout(() => {
                ;
              }, 2000);
        })
    }
    const carbons = api.useGetActivityQuery(user).data
    console.log(nlp)
    useEffect(() => {
        if (user && nlp && natures && carbons && !patched) {
           
            setPatched(true)
            console.log('hi');
            let totalDuration = 0;
            for (let i = -2; i <= 0; i++) {
                const currDate = new Date();
                currDate.setDate(currDate.getDate() + i);
                currDate.setHours(23, 59, 59, 999);
                const filteredNature = natures.filter((nature) => {
                    const startDate = new Date(nature.startDate);
                    startDate.setHours(0, 0, 0, 0);
                    const endDate = new Date(nature.endDate);
                    endDate.setHours(23, 59, 59, 999);
                    return startDate <= currDate && currDate <= endDate;
                });
                totalDuration += filteredNature.reduce(
                    (total, nature) => total + nature.duration,
                    0
                );
            }

            const natureScore = Math.min(
                Math.max(((totalDuration - 60) / 60) * 100 + 50, 10),
                100
            );

            let totalEmission = 0;
            if (carbons) {
                for (let i = -2; i <= 0; i++) {
                    const currDate = new Date();
                    currDate.setDate(currDate.getDate() + i);
                    currDate.setHours(23, 59, 59, 999);
                    const filteredCarbons = carbons.filter((carbon) => {
                        const startDate = new Date(carbon.startDate);
                        startDate.setHours(0, 0, 0, 0);
                        const endDate = new Date(carbon.endDate);
                        endDate.setHours(23, 59, 59, 999);
                        return startDate <= currDate && currDate <= endDate;
                    });
                    totalEmission += filteredCarbons.reduce(
                        (total, carbon) => total + parseInt(carbon.amount),
                        0
                    );
                }
            }
            console.log(totalEmission);
            const carbonScore = Math.min(
                Math.max(((totalEmission - 24000) / 24000) * 100 + 50, 10),
                100
            );
            console.log(nlp);
            const currDate = new Date();
            currDate.setHours(0, 0, 0, 0);
            const object = {
                email: user.email,
                dateArray: currDate,
                natureScoreArray: natureScore,
                carbonScoreArray: carbonScore,
                nlpScoreArray: nlp,
            };
            axios.patch('/score', object).then((res) => {
                console.log(res.data);
                setData(res.data)
                setGraph(true)
                setPatched(false)
            });


          
        }
    }, [carbons]);


    return null;
}
