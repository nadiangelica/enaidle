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
  //         {newestInfo !== "" && <img src={newestInfo.logoUrl} alt="organisation logo" height="200"/>}

  //         <p>Organisation Name: {org.organisationName}</p>
  //         {org.charityNumber && <p>Charity Number: {org.charityNumber}</p>}
  //         <p>Email Address: {org.email}</p>

  //         {newestInfo !== "" && (
  //             <div className="orgInfo">
  //                 <p>{newestInfo.missionStatement}</p>
  //                 <p><a href={newestInfo.websiteUrl}>{newestInfo.websiteUrl}</a></p>
  //                 <p>Address: {newestInfo.address}</p>
  //             </div>
  //         )}
  //     </div>
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
          <Form className="add-new-listing">
            <Row className="mb-4">
              <Form.Group as={Col} md="8">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={org.organisationName}
                  disabled
                  readOnly
                />
              </Form.Group>
              <Form.Group as={Col} md="4">
                <Form.Label>Charity Number</Form.Label>
                <Form.Control
                  type="text"
                  value={org.charityNumber}
                  disabled
                  readOnly
                />
              </Form.Group>
            </Row>

            <Row className="mb-4">
              <Form.Group as={Col} md="6">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="text" value={org.email} disabled readOnly />
              </Form.Group>
              <Form.Group as={Col} md="6">
                <Form.Label>Website</Form.Label>
                <Form.Control
                  value={org.websiteUrl}
                  type="text"
                  placeholder="Website"
                  disabled
                  readOnly
                />
              </Form.Group>
            </Row>

            <Row className="mb-4">
              <Form.Group as={Col} md="12">
                <Form.Label>Mission Statement</Form.Label>
                <Form.Control
                  type="text"
                  value={org.missionStatement}
                  placeholder="Mission statement"
                  disabled
                  readOnly
                />
              </Form.Group>
              <Form.Group as={Col} md="4"></Form.Group>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default OrgProfile;
