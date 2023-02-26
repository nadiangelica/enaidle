// this is a custom hook that returns the listings context
// first we import the ListingsContext
// then we use the useContext hook to return the context
//
import { useContext } from 'react';
import { ListingsContext } from '../context/ListingsContext';

export const useListingsContext = () => {
    return useContext(ListingsContext);
};