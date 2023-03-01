import React, { useState } from "react";
import moment from "moment";
import CommentForm from "../pages/CommentForm";

const SingleListingCard = ({ listing, isLoggedIn }) => {
  const createdDate = moment(listing.createdAt).fromNow();

  const comments = listing.comments.map((comment) => {
    const commentCreatedDate = moment(comment.createdAt).fromNow();
    return (
      <>
        <p>
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

      {isLoggedIn && <CommentForm />}
      {comments}
    </article>
  );
};

export default SingleListingCard;
