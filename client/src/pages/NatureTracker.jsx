import axios from "axios";
import { useState,useEffect, useContext } from "react";
import { UserContext } from "../../context/userContext";
import { NatureContext } from "../../context/natureContext";
import NatureTrackerForm from "../components/NatureTrackerForm";
export default function NatureTracker(){
    const {nature} = useContext(NatureContext);
    const {user} = useContext(UserContext);
    

    return{
        NatureTrackerForm
    }
}
