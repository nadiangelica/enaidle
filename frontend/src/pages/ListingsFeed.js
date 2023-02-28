import { useEffect } from 'react';
import { useListingsContext } from '../hooks/useListingsContext';
import ListingsFeed from '../components/ListingsFeed';
import "./ListingsFeed.css";

const Listings = () => {
    const { listings, dispatch } = useListingsContext();

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
        <div class="dropdown">
            <div id="myDropdown" class="dropdown-content">
                <strong>What are you interested in?</strong>
                <select>
                    <option value="requirement">Volunteering</option>
                    <option value="resources">Donation of Goods</option>
                </select>
                <div className="listings">
                    <h2>LISTINGS</h2>
                    {listings && listings.map((listing) => (
                        <ListingsFeed key={listing._id} listing={listing} />
                    ))}
                </div>
            </div>
        </div>)
}


export default Listings;
