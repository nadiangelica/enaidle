import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import Button from "react-bootstrap/Button";
import {Card, Col, Row, Form, Image, Button} from "react-bootstrap";
// import { Image } from "react-bootstrap";
// import Col from "react-bootstrap/Col";
// import Row from "react-bootstrap/Row";
// import Form from "react-bootstrap/Form";

const AccountProfile = () => {
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem("user")).id;
  if (!userId) {
    userId = JSON.parse(localStorage.getItem("user")).orgUser._id;
  }

  const [profile, setProfile] = useState({
    organisationName: undefined,
  });
  const [newestInfo, setNewestInfo] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch("/api/org-users/" + userId);
      const json = await response.json();
      setProfile(json);

      const infoLength = json.info.length;
      if (infoLength > 0) setNewestInfo(json.info[infoLength - 1]);
    };

    if (!profile.organisationName) fetchProfile();
  }, [profile, newestInfo]);

  const handleEditClick = () =>
    navigate("/profile/update", { state: { id: userId, info: newestInfo } });

  return (
    <div className="account-container">
      <Card>
        <Card.Header>Account Details</Card.Header>
        <Card.Body>
          <Card.Text className="org-logo">
            {newestInfo !== "" && (
              <img
                src={newestInfo.logoUrl}
                alt="organisation logo"
                height="200"
              />
            )}
          </Card.Text>
          <Card.Title>{profile.organisationName}</Card.Title>
          <Form className="add-new-listing">
            <Row className="mb-4">
              <Form.Group as={Col} md="8">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={profile.organisationName}
                  disabled
                  readOnly
                />
              </Form.Group>
              <Form.Group as={Col} md="4">
                <Form.Label>Charity Number</Form.Label>
                <Form.Control
                  type="text"
                  value={profile.charityNumber}
                  disabled
                  readOnly
                />
              </Form.Group>
            </Row>

            <Row className="mb-4">
              <Form.Group as={Col} md="6">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="text"
                  value={profile.email}
                  disabled
                  readOnly
                />
              </Form.Group>
              <Form.Group as={Col} md="6">
                <Form.Label>Website</Form.Label>
                <Form.Control
                  value={newestInfo.websiteUrl}
                  type="text"
                  placeholder="Add a website"
                  disabled
                  readOnly
                />
              </Form.Group>
            </Row>

            <Row className="mb-4">
              <Form.Group as={Col} md="8">
                <Form.Label>Mission Statement</Form.Label>
                <Form.Control
                  type="text"
                  value={newestInfo.missionStatement}
                  placeholder="Add a mission statement"
                  disabled
                  readOnly
                />
              </Form.Group>
              <Form.Group as={Col} md="4">
                <Form.Label>Profile Picture</Form.Label>
                <Form.Control
                  value={newestInfo.logoUrl}
                  type="text"
                  placeholder="Link to your logo"
                  disabled
                  readOnly
                />
              </Form.Group>
            </Row>
          </Form>
        </Card.Body>
        {userId && (
          <Button variant="custom" onClick={handleEditClick}>
            Update
          </Button>
        )}
      </Card>
    </div>
  );
};

export default AccountProfile;
