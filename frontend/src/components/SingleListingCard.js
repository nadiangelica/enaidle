import React, { useState } from "react";
import moment from "moment";
import CommentForm from "../pages/CommentForm";

const SingleListingCard = ({ listing }) => {
  const createdDate = moment(listing.createdAt).fromNow();

  const comments = listing.comments.map((comment) => {
    return <p>{comment.content}</p>;
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
      {<CommentForm />}
      {comments}
    </article>
  );
};

export default SingleListingCard;
