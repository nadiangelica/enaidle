import React from "react";
import { useState, useEffect } from "react";
import { useComment } from "../hooks/useComment";
import { useAuthContext } from "../hooks/useAuthContext";

const CommentForm = (props) => {
  const { dispatch } = useComment();
  const { user } = useAuthContext();

  const id = user.id;

  const [userName, setUserName] = useState("");
  const { addComment, error, loading } = useComment();

  useEffect(() => {
    getUserName();
  }, []);

  const getUserName = async () => {
    const response = await fetch(`/api/org-users/${id}`);
    const json = await response.json();
    if (response.ok) {
      if (json.organisationName) {
        setUserName(json.organisationName);
      } else {
        const response = await fetch(`/api/ind-users/${id}`);
        const json = await response.json();
        if (response.ok) {
          setUserName(json.firstName);
        }
      }
    } else {
      dispatch({ type: "SET_ERROR", payload: json });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { content } = e.target.elements;

    await addComment(userName, content.value);
  };

  return (
    <main>
      <div className="container">
        <form className="addCommentForm" onSubmit={handleSubmit}>
          <div className="input-box">
            <input className="form_field" placeholder="Add a comment..." id="content" type="text"/>
            <i></i>
          </div>

          <input id="submit" type="submit" value="Post" disabled={loading} />
        </form>
        {error && <div className="error">{error}</div>}
      </div>
    </main>
  );
};

export default CommentForm;
