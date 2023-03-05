import React, { useState, useEffect } from "react";
import moment from "moment";
import CommentForm from "../pages/CommentForm";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Image } from "react-bootstrap";
import '../Styling/home.css'
import HandLogo from "../assets/images/Hand.png";

const SingleListingCard = ({ listing, isLoggedIn }) => {
  let date = { listing }.listing.neededByDate;
  let year = date.slice(0, 4);
  let month = date.slice(5, 7);
  let day = date.slice(8, 10);
  let formattedDate = `${day}/${month}/${year}`;

  const createdDate = moment(listing.createdAt).fromNow();
  const commentsWithData = listing.comments.filter((comment) => {
    return comment !== null;
  });
  const comments = commentsWithData.map((comment, i) => {
    const commentCreatedDate = moment(comment.createdAt).fromNow();
    const timeCommentCreatedAt = moment(comment.createdAt).format("h:mma");
    return (
      <div className="comment-container" key={i + "com"}>
        <>
          <Card>
            <Image
              className="avatar"
              src={HandLogo}
              alt="comment logo"
              height="32"
            />
            <Card.Text className="comment-username">
              {comment.userName}
            </Card.Text>
            <Card.Text className="comment-content">
            {comment.content}
            </Card.Text >
            <Card.Text className="comment-date">
              <span className="text-muted">{commentCreatedDate} at {timeCommentCreatedAt}</span>
            </Card.Text>
          </Card>
        </>
      </div>
    );
  });

  return (
    <Card>
      <Card.Header>{listing.requirement}</Card.Header>
      <Card.Body>
        <article className="listing" data-cy="listing" key={listing._id}>
          <Card.Title>{listing.organisationName}</Card.Title>
          <Card.Text>{listing.description}</Card.Text>
          <Card.Text>Dated Needed By: {formattedDate}</Card.Text>
          <div>
            <Card.Text>Location</Card.Text>
            <Card.Text>{listing.address.firstLine}</Card.Text>
            <Card.Text>{listing.address.city}</Card.Text>
            <Card.Text>{createdDate}</Card.Text>
          </div>
          <hr />
          {comments}
          {isLoggedIn && <CommentForm />}
        </article>
      </Card.Body>
    </Card>
  );
};

export default SingleListingCard;

// <article className="listing" data-cy="listing" key={listing._id}>
//   <hr />
//   <p>Listed by: {listing.organisationName}</p>
//   <p>What's needed: {listing.requirement}</p>
//   <p>Needed by: {formattedDate}</p>
//   <p>Description: {listing.description}</p>
//   <div>
//   <p>Location</p>
//   <p>{listing.address.firstLine}</p>
//   <p>{listing.address.city}</p>
//   <p>{listing.address.postcode}</p>
//   <p>Created: {createdDate}</p>
//   </div>
//   <hr />

//   <button onClick={toggleExpanded}>
//     {isExpanded ? "Hide Comments" : "Comments"}
//   </button>
//   {isExpanded && isLoggedIn && <CommentForm />}
//   {isExpanded && comments}
// </article>
