import axios from 'axios';
import { createContext, useState, useEffect, useReducer } from 'react';

export const UserContext = createContext({});

export const userReducer = (state,action)=>{
    switch(action.type){
        case 'SET_USERS':
            return{
                users: action.payload
            }
        case 'CREATE_USER':
            return{
                users: [...state.users,action.payload]
            }
        case 'DELETE_USER':
            return{
                users: state.users.filter((user) => user._id !== action.payload._id)
            }
        case 'UPDATE_USER':
            const updatedUsers = state.users.map(user => {
                if (user._id === action.payload._id) {
                  return action.payload;
                }
                return user;
              });
              return {
                users: updatedUsers
              };
        default:
            return state
    }
}

export function UserContextProvider({ children }) {
    const [state,userDispatch] = useReducer(userReducer, {
        users: null
    })
    return (
        <UserContext.Provider value={{...state,userDispatch }}>
            {children}
        </UserContext.Provider>
    );
}
