import { Link } from "react-router-dom";
// import { useListingsContext } from '../hooks/useListingsContext';

const ListingsFeed = ({ listing }) => {
  return (
    <article className="listing" data-cy="listing" key={listing._id}>
      <hr />
      <h4>{listing.title}</h4>
      <p>listinged by: {listing.organisationName}</p>
      <p>What's needed: {listing.requirement}</p>
      <p>Needed by: {listing.neededByDate.slice(0, 10)}</p>
      <p>Description: {listing.description}</p>
      <p>Area: {listing.address.city}</p>
      {listing.comments.length > 0 && (
        <div>
          <span>{listing.comments.length} Comments</span>
        </div>
      )}
      <Link to={`/listings/${listing._id}`}>View Listing</Link>
    </article>
  );
};

export default ListingsFeed;
