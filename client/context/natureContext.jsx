import axios from "axios";
import { createContext,useState,useEffect, useContext } from "react";
import { UserContext } from "./userContext";
export const NatureContext = createContext({});

export function NatureContextProvider({children}){
    const {user} = useContext(UserContext);
    const [nature, setNature] = useState(null);
    useEffect(() =>{
        const email = user.email
        if (!nature){
            axios.get('/nature', {email}).then(({data}) =>{
                setNature(data)
            })
        }
    },[])
    return <NatureContext.Provider value={{user,setNature}}>{children}</NatureContext.Provider>
}