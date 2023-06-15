import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useParams } from "react-router-dom";

export const useComment = () => {
  const { listing_id } = useParams();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext();

  const addComment = async (userName, content) => {
    setLoading(true);
    setError(null);

    const response = await fetch(`/api/listings/${listing_id}/add-comment`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        'Authorization': `Bearer ${user.token}`,
        'User-Id': user.id
      },
      body: JSON.stringify({ userName, content }),
    });
    const json = await response.json();

    if (!response.ok) {
      setLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      setLoading(false);
    }
  };

  return { addComment, error, loading };
};
