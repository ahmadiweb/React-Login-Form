import React, { useReducer, useContext } from 'react'
import { initialState, reduser } from './reduser';

const AuthStateContext = React.createContext()
const AuthDispatchContext = React.createContext()

export const useAuthState = () => {
    const context = useContext(AuthStateContext);
    if (!context) {
        throw Error('you sholud use context provider')
    }
    return context;
}

export const useAuthDispatch = () => {
    const context = useContext(AuthDispatchContext);
    if (!context) {
        throw Error('you sholud use context provider')
    }
    return context;
}



export function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(reduser, initialState)

    return (
        <AuthStateContext.Provider value={state} >
            <AuthDispatchContext.Provider value={dispatch}>
                {children}
            </AuthDispatchContext.Provider>
        </AuthStateContext.Provider>

    )
}

