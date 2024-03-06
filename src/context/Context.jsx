import { createContext, useReducer } from 'react'
import Reducer from './Reducer'

/**
 * Initial state of the application
 * favorites empty array
 * page num 1 and page size 10
 */
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