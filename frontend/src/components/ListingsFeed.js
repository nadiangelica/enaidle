import { Link } from 'react-router-dom';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useAuthContext } from '../hooks/useAuthContext';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import GiveImage from "../assets/images/give.png";


const ListingsFeed = ({ listing }) => {
    // formatting the date for neededByDate
    let date = { listing }.listing.neededByDate;
    let year = date.slice(0, 4);
    let month = date.slice(5, 7);
    let day = date.slice(8, 10);
    let formattedDate = `${day}/${month}/${year}`;

    const { user } = useAuthContext();

    return (
        // <article className="listing" data-cy="listing" key={ listing._id }>
        //     <hr />
        //     <a href={`/organisations/${listing.organisationId}`}>
        //         <img src={listing.logo} alt="organisation logo" height="100"/>
        //     </a>
        //     <h4>{listing.title}</h4>
        //     <p><a href={`/organisations/${listing.organisationId}`}>{listing.organisationName}</a></p>
        //     <p>What's needed: {listing.requirement}</p>
        //     <p>Description: {listing.description}</p>
        //     <p>Area: {listing.address.city}</p>
        //     <p>Date required: {formattedDate}</p>
        //     <p>{formatDistanceToNow(new Date(listing.createdAt), { addSuffix: true})}</p>
        //     <Link to={`/listings/${listing._id}`}>View Listing</Link>
        //     {listing.comments.length > 0 && (
        //         <div>
        //             <span>{listing.comments.length} Comments</span>
        //         </div>
        //     )}
        // </article>
    <div className="listings-grid">
     <article className="listing article-grid" data-cy="listing" key={ listing._id }>
      <Card style={{ width: '28rem' }}>
      <Card.Img variant="top" src={GiveImage} />
      <Card.Body>
         {/* <a href={`/organisations/${listing.organisationId}`}>
           <img src={listing.logo} alt="organisation logo" height="100"/>
         </a> */}
        <Card.Title>{listing.title}</Card.Title>
        <Card.Text>
        <a href={`/organisations/${listing.organisationId}`}>{listing.organisationName}</a>
        </Card.Text>
        <Card.Text>{listing.requirement}</Card.Text>
        <Card.Text>{listing.description}</Card.Text>
        <Card.Text>{listing.address.city}</Card.Text>
        <Card.Text>{formattedDate}</Card.Text>
        <Card.Text>{formatDistanceToNow(new Date(listing.createdAt), { addSuffix: true})}</Card.Text>
        <Link to={`/listings/${listing._id}`}>View Listing</Link> {listing.comments.length > 0 && (
                <div>
                    <span>{listing.comments.length} Comments</span>
                </div>
            )}
      </Card.Body>
    </Card>
    </article>
    </div>
    );
};

export default ListingsFeed;
