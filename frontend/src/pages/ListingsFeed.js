import { useEffect, useState } from 'react';
import { useListingsContext } from '../hooks/useListingsContext';
import { useAuthContext } from "../hooks/useAuthContext";
import ListingsFeed from '../components/ListingsFeed';
import CreateForm from '../components/CreateForm';
import "./ListingsFeed.css";

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

            // code below is for getting the profile pic url
            const orgIds = json.map(e => e.organisationId).filter(e => e);
            const uniqueOrgIds = [...new Set(orgIds)];

            console.log(uniqueOrgIds);
            const orgLogos = [];

            if (uniqueOrgIds) {
                uniqueOrgIds.map(async (id) => {
                    const response = await fetch('/api/org-users/' + id);
                    const json = await response.json();

                    const info = json.info.reverse()[0];
                    let profilePic;
                    
                    if (json.charityNumber) profilePic = "charity";
                    else profilePic = "org";
                    
                    if (info && info.logoUrl !== "") profilePic = info.logoUrl;

                    orgLogos.push({id, profilePic});
                })
            }

            // setLogos(orgLogos);

            console.log(orgLogos);

            json.map(obj => (
                console.log(obj)
            ))

            // console.log(payload);

            if (response.ok) {
                dispatch({ type: 'SET_LISTINGS', payload: json });
            } else {
                dispatch({ type: 'SET_ERROR', payload: json });
            }
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
