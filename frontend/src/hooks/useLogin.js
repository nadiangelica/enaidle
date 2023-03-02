import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useOrgLogin = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const login = async (email, password, userType) => {
        setLoading(true);
        setError(null);

        const response = await fetch(`./api/${userType}-users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
        const json = await response.json();

        if(!response.ok) {
            setLoading(false);
            setError(json.error);
        }
        
        if (response.ok) {
            localStorage.setItem('user', JSON.stringify(json));

            dispatch({ type: 'LOGIN', payload: json });

            setLoading(false);
        }
    }
    
    return { login, error, loading };
}