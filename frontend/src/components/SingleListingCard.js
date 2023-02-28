import { Link } from "react-router-dom";
import moment from 'moment';

const ListingCard = ({ listing }) => {
  const createdDate = moment(listing.createdAt).fromNow();

  return (
    <article className="listing" data-cy="listing" key={listing._id}>
      <hr />
      <p>Listinged by: {listing.organisationName}</p>
      <p>Created {createdDate}</p>
      <p>What's needed: {listing.requirement}</p>
      <p>Needed by: {listing.neededByDate.slice(0, 10)}</p>
      <p>Description: {listing.description}</p>
      <p>Area: {listing.address.city}</p>
      <p>ADD COMMENT BUTTON</p>
    </article>
  );
};

export default ListingCard;
