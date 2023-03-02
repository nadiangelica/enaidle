import { useEffect, useState } from 'react';
import { useListingsContext } from '../hooks/useListingsContext';
import { useAuthContext } from "../hooks/useAuthContext";
import ListingsFeed from '../components/ListingsFeed';
import CreateForm from '../components/CreateForm';
import "./ListingsFeed.css";
import charityLogo from '../assets/images/charity_logo.png';
import orgLogo from '../assets/images/organisation_logo.png';

// post request to create a new listing
    
const Listings = () => {
    const {user} = useAuthContext();

    const { listings, dispatch } = useListingsContext();
    const [listingRequirement, setListingRequirement] = useState("all");
    // const [logos, setLogos] = useState([]);

    const createListing = async (listing) => {
        const response = await fetch('/api/listings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(listing)
        });
        const json = await response.json();
        if (response.ok) {
            dispatch({ type: 'CREATE_LISTING', payload: json });
        } else {
            dispatch({ type: 'SET_ERROR', payload: json });
        }
    }
 
    useEffect(() => {
        const fetchListings = async () => {
            const response = await fetch('/api/listings');
            const json = await response.json();
            let listingsWithLogos = [];

            const reloadListings = () => {
                if (response.ok) {
                    dispatch({ type: 'SET_LISTINGS', payload: listingsWithLogos });
                } else {
                    dispatch({ type: 'SET_ERROR', payload: json });
                }
            }

            const placeholderLogo = (obj) => {
                if (obj.charityNumber) {
                    return charityLogo;
                } else {
                    return orgLogo;
                }
            }
            
            json.map(async obj => {
                if (obj.organisationId) {
                    const res = await fetch('/api/org-users/' + obj.organisationId);
                    const data = await res.json();
                    const info = data.info.reverse()[0];

                    let profilePic = placeholderLogo(data);

                    if (info && info.logoUrl !== "") profilePic = info.logoUrl;
                    listingsWithLogos.push({...obj, logo: profilePic});
                    reloadListings();
                } else {
                    let profilePic = placeholderLogo(obj);
                    listingsWithLogos.push({...obj, logo: profilePic});
                    reloadListings();
                }
            })
        }

        fetchListings();
    }, [dispatch]);

    let listingsToShow;
    switch (listingRequirement) {
        case 'volunteering':
            listingsToShow = listings.filter(listing => listing.requirement === 'Volunteering')
            break;
        case 'donation':
            listingsToShow = listings.filter(listing => listing.requirement === 'Donation of Goods')
            break;
        default:
            listingsToShow = listings;
            break;
    }

    return (
        <div className="dropdown">
            <div id="myDropdown" className="dropdown-content">
                <strong>What are you interested in?</strong>
                <select onChange={e => setListingRequirement(e.target.value)}>
                    <option value="all">All</option>
                    <option value="volunteering">Volunteering</option>
                    <option value="donation">Donation of Goods</option>
                </select>
                <div className="listings">
                    <h2>LISTINGS</h2>
                    {(user && (user.type === "org") && (<CreateForm 
                        createListing={createListing}
                        buttonTitle="Create Listing"
                    />))}
                    {!listings
                        ? <p>Nothing to see here, yet.</p>
                        : listingsToShow.length === 0
                            ? <p>No listings matching your choice, please select another option.</p>
                            : listingsToShow.map(listing => <ListingsFeed key={listing._id} listing={listing}/>)
                    } 
                </div>
            </div>
        </div>
    )
}


export default Listings;
