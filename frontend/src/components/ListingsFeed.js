import { Link } from 'react-router-dom';
import { useListingsContext } from '../hooks/useListingsContext';

const ListingsFeed = ({ listing }) => {

    return (
        <div className="listing">
            <h3>{listing.title}</h3>
            <p>{listing.organisationName}</p>
            <p>{listing.description}</p>
            <p>{listing.price}</p>
            <p>{listing.location}</p>
            <p>{listing.contact}</p>
            <Link to={`/listings/${listing._id}`}>View Listing</Link>
        </div>
    )
};

export default ListingsFeed;