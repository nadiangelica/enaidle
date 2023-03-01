import { Link } from 'react-router-dom';
import { useListingsContext } from '../hooks/useListingsContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const ListingsFeed = ({ listing }) => {
    // formatting the date for neededByDate
    let date = { listing }.listing.neededByDate;
    let year = date.slice(0, 4);
    let month = date.slice(5, 7);
    let day = date.slice(8, 10);
    let formattedDate = `${day}/${month}/${year}`;

    // to have a patch request to update the listing
     const { dispatch } = useListingsContext();


    const handleEdit = async (listing) => {
        const response = await fetch(`/api/listings/${listing._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(listing)
        });
        const json = await response.json();
        if (response.ok) {
            dispatch({ type: 'UPDATE_LISTING', payload: json });
        } else {
            dispatch({ type: 'SET_ERROR', payload: json });
        }
    }


    return (
        <div className="listing">
            <h3>{listing.title}</h3>
            <p>{listing.organisationName}</p>
            <p>{listing.description}</p>
            <p>{listing.requirement}</p>
            <p>{listing.address.firstLine}</p>
            <p>{listing.address.city}</p>
            <p>{listing.address.postcode}</p>
            <p>{formattedDate}</p>
            <p>{formatDistanceToNow(new Date(listing.createdAt), { addSuffix: true})}</p>
            <Link to={`/listings/${listing._id}`}>View Listing</Link>
        </div>
    )
};

export default ListingsFeed;