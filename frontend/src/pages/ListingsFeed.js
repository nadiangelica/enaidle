import { useEffect } from 'react';
import { useListingsContext } from '../hooks/useListingsContext';
import ListingsFeed from '../components/ListingsFeed';


const Listings = () => {
    const { listings,  dispatch } = useListingsContext();

    useEffect(() => {
        const fetchListings = async () => {
            const response = await fetch('/api/listings');
            const json = await response.json();
            
            if (response.ok) {
                dispatch({ type: 'SET_LISTINGS', payload: json });
            } else {
                dispatch({ type: 'SET_ERROR', payload: json });
            }
        }
        fetchListings();
    }, [dispatch]);

    return (
        <div className="listings">
            <h2>LISTINGS</h2>
            {listings && listings.map((listing) => (
                <ListingsFeed key={listing._id} listing={listing} />
            ))}
        </div>
    )
}

export default Listings;