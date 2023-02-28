import { useEffect } from 'react';
import { useListingsContext } from '../hooks/useListingsContext';
import ListingsFeed from '../components/ListingsFeed';
import "./ListingsFeed.css";

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
    )}
        <div class="dropdown">
            <button onclick="myFunction()" class="dropbtn">Dropdown</button>
            <div id="myDropdown" class="dropdown-content">
                <input type="text" placeholder="Filter" id="myInput" onkeyup="filterFunction()" />
                <a href="#volunteer">Volunteer</a>
                <a href="#donate">Donate</a>
            </div>
        </div>


export default Listings;