import React, { useEffect, useState } from "react";
// import './OrgProfile.css';
import { Image, Card, Button, Col, Row, Form } from "react-bootstrap";

const OrgProfile = () => {
  const [org, setOrg] = useState("");
  const [newestInfo, setNewestInfo] = useState("");

  useEffect(() => {
    const fetchOrg = async () => {
      const orgId = window.location.pathname.split("/")[2];
      const response = await fetch("/api/org-users/" + orgId);
      const json = await response.json();
      setOrg(json);

      const infoLength = json.info.length;
      if (infoLength > 0) {
        setNewestInfo(json.info[infoLength - 1]);
      }
    };

    if (org === "") {
      fetchOrg();
    }
  }, [org, newestInfo]);

  // return (
  //     <div className="profileContainer">
  //         {/* {newestInfo !== "" && <img src={newestInfo.logoUrl} alt="organisation logo" height="200"/>} */}         )}
  //      </div>
  //         {/* <p>Organisation Name: {org.organisationName}</p> */}
  //         {/* {org.charityNumber && <p>Charity Number: {org.charityNumber}</p>} */}
  //         {/* <p>Email Address: {org.email}</p> */}

  //      {newestInfo !== "" && (
  //             <div className="orgInfo">
  //                  <p>{newestInfo.missionStatement}</p>
  //                  <p><a href={newestInfo.websiteUrl}>{newestInfo.websiteUrl}</a></p>
  //                  <p>Address: {newestInfo.address}</p>
  //              </div>
  
  // )

  return (
    <div className="account-container">
      <Card>
        <Card.Header>{org.organisationName}</Card.Header>
        <Card.Body>
          <Card.Text className="org-logo">
            {newestInfo !== "" && (
              <Image
                src={newestInfo.logoUrl}
                alt="organisation logo"
                height="200"
              />
            )}
          </Card.Text>
          {/* <Card.Title>{org.organisationName}</Card.Title> */}
          <div>
            {org.organisationName}<br />
            {org.email}<br />
            {org.websiteUrl}<br />
            Charity number: {org.charityNumber}<br />
            {newestInfo.missionStatement}<br />
          </div>
          
        </Card.Body>
      </Card>
    </div>
  );
};

export default OrgProfile;
