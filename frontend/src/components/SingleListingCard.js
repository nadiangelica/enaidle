import React, { useState, useEffect } from "react";
import moment from "moment";
import CommentForm from "../pages/CommentForm";

const SingleListingCard = ({ listing, isLoggedIn }) => {
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

  const comments = displayedComments.map((comment, i) => {
    const commentCreatedDate = moment(comment.createdAt).fromNow();
    return (
      <>
        <p key={i}>
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
      <p>Needed by: {listing.neededByDate.slice(0, 10)}</p>
      <p>Description: {listing.description}</p>
      <p>Area: {listing.address.city}</p>
      <p>Created {createdDate}</p>

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
