import { Link } from 'react-router-dom';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useAuthContext } from '../hooks/useAuthContext';

const ListingsFeed = ({ listing }) => {
    // formatting the date for neededByDate
    let date = { listing }.listing.neededByDate;
    let year = date.slice(0, 4);
    let month = date.slice(5, 7);
    let day = date.slice(8, 10);
    let formattedDate = `${day}/${month}/${year}`;

    const { user } = useAuthContext();

    return (
        <article className="listing" data-cy="listing" key={ listing._id }>
            <hr />
            <h4>{listing.title}</h4>
            <p>listed by: {listing.organisationName}</p>
            <p>What's needed: {listing.requirement}</p>
            {/* <p>Needed by: {listing.neededByDate.slice(0, 10)}</p> */}
            <p>Description: {listing.description}</p>
            <p>Area: {listing.address.city}</p>
            <p>{formattedDate}</p>
            <p>{formatDistanceToNow(new Date(listing.createdAt), { addSuffix: true})}</p>
            <Link to={`/listings/${listing._id}`}>View Listing</Link>
        </article>
    );
};

export default ListingsFeed;