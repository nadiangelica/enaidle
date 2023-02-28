import { useState } from "react";
import { useComment } from "../hooks/useComment";

const CommentForm = () => {
  const [content, setContent] = useState("");
  const { addComment, error, loading } = useComment();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addComment("", content);
  };
  const updateComment = async (e) => {
    setContent(e.target.value);
    // await addComment(content);
  };
  return (
    <main>
      <div className="container">
        <form className="addCommentForm" onSubmit={handleSubmit}>
          <div className="input-box">
            {/* <label id='form_label' htmlFor='add-comment'>Comment</label > */}
            <input
              className="form_field"
              placeholder="Add a comment..."
              id="add-comment"
              type="text"
              value={content}
              onChange={updateComment}
            />
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
