import { createContext, useReducer } from "react";

export const NatureContext = createContext()

export const natureReducer = (state,action)=>{
    switch(action.type){
        case 'SET_NATURES':
            return{
                natures: action.payload
            }
        case 'CREATE_NATURE':
            return{
                natures: [...state.natures,action.payload]
            }
        case 'DELETE_NATURE':
            return{
                natures: state.natures.filter((nature) => nature._id !== action.payload._id)
            }
        case 'UPDATE_NATURE':
            const updatedNatures = state.natures.map(nature => {
                if (nature._id === action.payload._id) {
                  return action.payload;
                }
                return nature;
              });
              return {
                natures: updatedNatures
              };
        default:
            return state
    }
}

export const NatureContextProvider = ({children}) =>{
    const [state,dispatch] = useReducer(natureReducer, {
        natures: null
    })
    
    return (
        <NatureContext.Provider value={{...state,dispatch}}>
            {children}
        </NatureContext.Provider>
    )
}