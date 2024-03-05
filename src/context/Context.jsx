import { createContext, useReducer, useEffect } from 'react'
import Reducer from './Reducer'

const INITIAL_STATE = {
    favorites: [],
    pageDet: {
        pageNo: 1,
        pageSize: 10
    }
};

export const AppContext = createContext(INITIAL_STATE);

export const AppContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

    return (
        <AppContext.Provider value={{
            favorites: [...state.favorites],
            pageDet: {
                ...state.pageDet
            },
            dispatch
        }}>
            {children}
        </AppContext.Provider>
    )
}