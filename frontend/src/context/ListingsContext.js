// this is the context that will be used to store the listings data
//
import { createContext, useReducer } from "react";

export const ListingsContext = createContext();

export const listingsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_LISTINGS':
            return { listings: action.payload };
        case 'CREATE_LISTING':
            return { listings: [...state.listings, action.payload] };
        // case 'DELETE_LISTING':
        //     return { listings: state.listings.filter(listing => listing._id !== action.payload._id) };
        case 'UPDATE_LISTING':
            return { listings: state.listings.map(listing => listing._id === action.payload._id ? action.payload : listing) };
        case 'SET_ERROR':
            return { error: action.payload };
        default:
            return state;
    }
}

export const ListingsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(listingsReducer, { listings: null, error: null });

    return (
        <ListingsContext.Provider value={{ ...state, dispatch }}>
            {children}
        </ListingsContext.Provider>
    )
};
