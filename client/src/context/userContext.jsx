import axios from 'axios';
import { createContext, useState, useEffect, useReducer } from 'react';

export const UserContext = createContext({});

export const userReducer = (state,action)=>{
    switch(action.type){
        case 'SET_USERS':
            return{
                user: action.payload
            }
        default:
            return state
    }
}

export function UserContextProvider({ children }) {
    const [state,userDispatch] = useReducer(userReducer, {
        user: null
    })
    return (
        <UserContext.Provider value={{...state,userDispatch }}>
            {children}
        </UserContext.Provider>
    );
}
