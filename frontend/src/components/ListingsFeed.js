import { Link } from 'react-router-dom';
import { useListingsContext } from '../hooks/useListingsContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import NewRequestForm from './newRequest/NewRequest';

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
        <div className="listings-feed">
            <div className="listings-feed__header">
                <h2 className="listings-feed__title">Listings</h2>
                <NewRequestForm />
                <h2>Filter by requirement</h2>
                <div className="listings-feed__filter">
                    {listing.map((listing) => (
                        <Link to={`/listings/${listing.requirement}`}>
                            <button className="listings-feed__filter-button">
                                {listing.requirement}
                            </button>
                        </Link>
                    ))}
                </div>
            <div className="listings-feed__listings">
                {listing.map((listing) => (
                    <div className="listing" key={listing._id}>
                        <div className="listing__header">
                            <h3 className="listing__title">{listing.title}</h3>
                            <p className="listing__date">
                                {formatDistanceToNow(new Date(listing.createdAt), {
                                    addSuffix: true,
                                })}
                            </p>
                        </div>
                        <div className="listing__body">
                            <p className="listing__description">
                                {listing.description}
                            </p>
                            <p className="listing__address">
                                {listing.firstLine}
                                <br />
                                {listing.city}
                                <br />
                                {listing.postcode}
                            </p>
                            <p className="listing__needed-by">
                                Needed by: {formattedDate}
                            </p>
                        </div>
                        <div className="listing__footer">
                            <Link
                                to={`/listings/${listing._id}`}
                                className="listing__link"
                            >
                                View listing
                            </Link>
                            <button
                                className="listing__edit"
                                onClick={() => handleEdit(listing)}
                            >
                                Edit
                            </button>
                        </div>
                    </div>  
                ))}
            </div>
        </div>
    </div>                           
    );
};


export default ListingsFeed;