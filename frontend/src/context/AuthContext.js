import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { orgUser: action.payload };
        case 'LOGOUT':
            return { orgUser: null };
        default:
            return state;
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, { orgUser: null });

    useEffect(() => {
        const orgUser = JSON.parse(localStorage.getItem('orgUser'));
        if (orgUser) {
            dispatch({ type: 'LOGIN', payload: orgUser });
        }
    }, []);

    console.log('AuthContext state: ', state);
    
    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}