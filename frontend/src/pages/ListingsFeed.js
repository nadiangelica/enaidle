import { useEffect, useState } from "react";
import { useListingsContext } from "../hooks/useListingsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import ListingsFeed from "../components/ListingsFeed";
// import CreateForm from "../components/CreateForm";
import "./ListingsFeed.css";
import charityLogo from "../assets/images/charity_logo.png";
import orgLogo from "../assets/images/organisation_logo.png";
import { Row, Col } from "react-bootstrap";
import { ButtonGroup, Dropdown, Button } from "react-bootstrap";
import { Link } from "react-router-dom";


const Listings = () => {
  const { user } = useAuthContext();

  const { listings, dispatch } = useListingsContext();
  const [listingRequirement, setListingRequirement] = useState("all");
  const [isUpdated, setIsUpdated] = useState(false);
  const [listingsWithLogos, setListingsWithLogos] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      const response = await fetch("/api/listings");
      const json = await response.json();

      const placeholderLogo = (obj) => {
        if (obj.charityNumber) {
          return charityLogo;
        } else {
          return orgLogo;
        }
      };

      const requests = json.map(async (obj) => {
        if (obj.organisationId) {
          const res = await fetch("/api/org-users/" + obj.organisationId);
          const data = await res.json();
          const info = data.info.reverse()[0];

          let profilePic = placeholderLogo(data);

          if (info && info.logoUrl !== "") profilePic = info.logoUrl;
          return { ...obj, logo: profilePic };
        } else {
          let profilePic = placeholderLogo(obj);
          return { ...obj, logo: profilePic };
        }
      });

      Promise.all(requests).then((listingsWithLogos) => {
        if (response.ok) {
          dispatch({ type: "SET_LISTINGS", payload: listingsWithLogos });
        } else {
          dispatch({ type: "SET_ERROR", payload: json });
        }
        setListingsWithLogos(listingsWithLogos);
      });
    };

    fetchListings();
    setIsUpdated(true);
  }, [dispatch, isUpdated]);

  let listingsToShow;
  switch (listingRequirement.toLowerCase()) {
    case "volunteering":
      listingsToShow = listings.filter(
        (listing) => listing.requirement === "Volunteering"
      );
      break;
    case "donation of goods":
      listingsToShow = listings.filter(
        (listing) => listing.requirement === "Donation of goods"
      );
      break;
    default:
      listingsToShow = listings;
      break;
  }


  return (
    <div className="listings-page">
      <div className="title">
        <h2>Volunteer or donate, you choose!</h2>
      </div>

      <div className="listing-bar-add-a-new-listing">
        <ButtonGroup>
          {user && user.type === "org" && (
            <Link to="/listings/new-listing">
              <Button variant="custom">Add a listing</Button>
            </Link>
          )}

          <Dropdown>
            <Dropdown.Toggle variant="custom" id="dropdown-basic">
              What are you interested in?
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => {
                  console.log("All clicked");
                  setListingRequirement("all");
                }}
              >
                All
              </Dropdown.Item>
              <Dropdown.Item
                onClick={(e) => {
                  e.preventDefault();
                  console.log("Volunteering clicked");
                  setListingRequirement("Volunteering");
                  console.log("Volunteering clicked");
                }}
              >
                Volunteering
              </Dropdown.Item>
              <Dropdown.Item
                onClick={(e) => {
                  e.preventDefault();
                  console.log("Donation clicked");
                  setListingRequirement("Donation of goods");
                  console.log("Donation clicked");
                }}
              >
                Donation of goods
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </ButtonGroup>
      </div>
      <div id="myDropdown" className="listing-grid-card">
        {!listings ? (
          <p>Nothing to see here, yet.</p>
        ) : listingsToShow.length === 0 ? (
          <p>No listings matching your choice, please select another option.</p>
        ) : (
          <div className="listings-grid">
            <Row xs={1} md={3} className="g-4">
              {listingsToShow.map((listing) => (
                <Col key={listing._id}>
                  <ListingsFeed listing={listing} />
                </Col>
              ))}
            </Row>
          </div>
        )}
      </div>
    </div>
  );
};

export default Listings;
