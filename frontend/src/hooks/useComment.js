import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useParams } from "react-router-dom";

export const useComment = () => {
  const { listing_id } = useParams();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const addComment = async (user_id, content) => {
    setLoading(true);
    setError(null);

    const response = await fetch(`/api/listings/${listing_id}/add-comment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
    const json = await response.json();

    if (!response.ok) {
      setLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      localStorage.setItem("comments", JSON.stringify(json));

      dispatch({ type: "LOGIN", payload: json });

      setLoading(false);
    }
  };

  return { addComment, error, loading };
};
