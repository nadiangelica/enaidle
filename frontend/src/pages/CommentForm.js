import React from "react";
import { useState, useEffect } from "react";
import { useComment } from "../hooks/useComment";
import { useAuthContext } from "../hooks/useAuthContext";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const CommentForm = (props) => {
  const { dispatch } = useComment();
  const { user } = useAuthContext();
  const { addComment, error, loading } = useComment();

  const [isSubmitted, setShowSubmittedMessage] = useState(false);
  const [userName, setUserName] = useState("");

  const id = user.id;
  const userType = user.type;

  useEffect(() => {
    const getUserName = async () => {
      const response = await fetch(`/api/${userType}-users/${id}`);
      const json = await response.json();
      if (response.ok) {
        if (userType === "org") setUserName(json.organisationName);
        if (userType === "ind")
          setUserName(json.firstName + " " + json.lastName);
      } else {
        dispatch({ type: "SET_ERROR", payload: json });
      }
    };

    getUserName();
  }, [userName]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { content } = e.target.elements;

    await addComment(userName, content.value);
    setShowSubmittedMessage(true);
  };

  return (
    // <main>
    //     <div className="container">
    //         <form className="addCommentForm" onSubmit={handleSubmit}>
    //             <div className="input-box">
    //                 <input className="form_field" placeholder="Add a comment..." id="content" type="text"/><input id="submit" type="submit" value="Post" disabled={loading} />
    //             </div>
    //         </form>
    //         {error && <div className="error">{error}</div>}
    //         {isSubmitted && <div className="info">Comment Submitted! Please refresh the page.</div>}
    //     </div>
    // </main>
    <div className="container">
      <Form className="addCommentForm" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Add a comment:</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>
        <Button
          variant="primary"
          className="float-right ml-auto w-100"
          type="submit"
          disabled={loading}
        >
          {loading ? "Posting..." : "Post"}
        </Button>
      </Form>
      {error && <div className="error">{error}</div>}
      {isSubmitted && (
        <div className="info">Comment Submitted! Please refresh the page.</div>
      )}
    </div>
  );
};

export default CommentForm;
