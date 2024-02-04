import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import {DateTimePicker} from "@mui/x-date-pickers"

export default function NatureTrackerForm(){
    const {user} = useContext(UserContext)
    const [activity, setActivity] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("")

    const handleSubmit =() =>{
        const object = {
            email: user.email,
            activity:activity,
            startDate: Date.parse(startDate),
            endDate: Date.parse(endDate),
            duration: Date.parse(endDate).getTime() - Date.parse(startDate).getTime()
        }
        console.log(object)
        axios.post('/nature', object).then((e)=>console.log(e))
    }

    return (
        <div>
            <h1>Log your time spent connecting with nature 🌲🌳🌿</h1>
            <form onSubmit={handleSubmit}>
                <input placeholder="Activity" onChange={(e) =>{setActivity(e)}}>Activity</input>
                <DateTimePicker
                label="Start Date"
                onChange={(e) => {setStartDate(e)}}
                />
                <DateTimePicker
                label="End Date"
                defaultValue={startDate}
                onChange={(e)=>{setEndDate(e)}}
                />
            </form>
        </div>
    )
}