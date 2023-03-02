import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useListingsContext } from "../hooks/useListingsContext";
import SingleListingCard from "../components/SingleListingCard";
import "./ListingsFeed.css";

const SingleListing = () => {
  const { listing_id } = useParams();
  const { listing, dispatch } = useListingsContext();

  const isLoggedIn = localStorage.getItem("user");

  useEffect(() => {
    const fetchListing = async () => {
      const response = await fetch(`/api/listings/${listing_id}`);
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_LISTING", payload: json });
      } else {
        dispatch({ type: "SET_ERROR", payload: json });
      }
    };

    fetchListing();
  }, [dispatch, listing_id]);

  return (
    <div className="listings">
      {listing ? (
        <div>
          {/* <h2>{listing.organisationName}</h2> */}
          <SingleListingCard listing={listing} isLoggedIn={isLoggedIn} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SingleListing;
