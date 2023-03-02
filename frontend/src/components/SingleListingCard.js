import React, { useState, useEffect } from "react";
import moment from "moment";
import CommentForm from "../pages/CommentForm";

const SingleListingCard = ({ listing, isLoggedIn }) => {
  let date = { listing }.listing.neededByDate;
  let year = date.slice(0, 4);
  let month = date.slice(5, 7);
  let day = date.slice(8, 10);
  let formattedDate = `${day}/${month}/${year}`;

  const createdDate = moment(listing.createdAt).fromNow();
  const [isExpanded, setIsExpanded] = useState(false);
  const [displayedComments, setDisplayedComments] = useState([]);

  useEffect(() => {
    setDisplayedComments(listing.comments.slice(0, 5));
  }, [listing.comments]);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      setDisplayedComments(listing.comments);
    } else {
      setDisplayedComments(listing.comments.slice(0, 5));
    }
  };

  const commentsWithData = displayedComments.filter((comment) => {
    return comment !== null;
  });
  const comments = commentsWithData.map((comment, i) => {
    const commentCreatedDate = moment(comment.createdAt).fromNow();
    return (
      <>
        <p key={i+"com"}>
          {comment.userName}: {comment.content}
        </p>
        <p>{commentCreatedDate}</p>
      </>
    );
  });

  return (
    <article className="listing" data-cy="listing" key={listing._id}>
      <hr />
      <p>Listinged by: {listing.organisationName}</p>
      <p>What's needed: {listing.requirement}</p>
      <p>Needed by: {formattedDate}</p>
      <p>Description: {listing.description}</p>
      <div>
      <p>Location</p>
      <p>{listing.address.firstLine}</p>
      <p>{listing.address.city}</p>
      <p>{listing.address.postcode}</p>
      <p>Created: {createdDate}</p>
      </div>
      <hr />

      <button onClick={toggleExpanded}>
        {isExpanded ? "Hide Comments" : "Comments"}
      </button>
      {isExpanded && isLoggedIn && <CommentForm />}
      {isExpanded && comments}
    </article>
  );
};

export default SingleListingCard;
