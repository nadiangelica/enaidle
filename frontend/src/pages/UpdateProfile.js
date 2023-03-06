import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Col, Row, Form, Image, Button } from "react-bootstrap";
import '../Styling/home.css'

const UpdateProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentInfo = location.state.info;
  const userId = location.state.id;

  const [missionStatement, setMissionStatement] = useState(
    currentInfo.missionStatement
  );
  const [websiteUrl, setWebsiteUrl] = useState(currentInfo.websiteUrl);
  const [logoUrl, setLogoUrl] = useState(currentInfo.logoUrl);
  const [address, setAddress] = useState(currentInfo.address);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updateProfile = async () => {
      const response = await fetch("/api/org-users/update-info", {
        method: "post",
        body: JSON.stringify({
          orgUserId: location.state.id,
          missionStatement: missionStatement,
          websiteUrl: websiteUrl,
          address: address,
          logoUrl: logoUrl,
        }),
        headers: { "Content-Type": "application/json" },
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.message);
      } else {
        navigate("/profile");
      }
    };

    updateProfile();
  };

  const handleMissionStatementChange = (event) =>
    setMissionStatement(event.target.value);
  const handleWebsiteUrlChange = (event) => setWebsiteUrl(event.target.value);
  const handleAddressChange = (event) => setAddress(event.target.value);
  const handleLogoUrlChange = (event) => setLogoUrl(event.target.value);

  return (
    <div className="update-account-container">
      <h2 className="title">Update your Information</h2>
      <br></br>
      <div className="container">
        <form className="updateInfoForm" onSubmit={handleSubmit}>
          <div className="input-box">
            <label id="form_label" htmlFor="mission-statement">
              Mission Statement:{" "}
            </label>
            <textarea
              rows="20"
              cols="50"
              className="form_field"
              id="mission-statement"
              type="text"
              value={missionStatement}
              onChange={handleMissionStatementChange}
              placeholder="What would you like to tell the enaidle community about your organisation?"
            />
          </div>

          <div className="input-box">
            <label id="form_label" htmlFor="website-url">
              Website URL:{" "}
            </label>
            <input
              size="50"
              className="form_field"
              id="website-url"
              type="text"
              value={websiteUrl}
              onChange={handleWebsiteUrlChange}
              placeholder="Link to your organisation homepage"
            />
          </div>

          <div className="input-box">
            <label id="form_label" htmlFor="address">
              Address:{" "}
            </label>
            <input
              size="50"
              className="form_field"
              id="address"
              type="text"
              value={address}
              onChange={handleAddressChange}
              placeholder="Your organisation HQ address"
            />
          </div>

          <div className="input-box">
            <label id="form_label" htmlFor="logo-url">
              Logo URL:{" "}
            </label>
            <input
              size="50"
              className="form_field"
              id="logo-url"
              type="text"
              value={logoUrl}
              onChange={handleLogoUrlChange}
              placeholder="Link to your logo"
            />
          </div>

          <input id="submit" type="submit" value="Submit" />
        </form>
        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
};

{
  /* <div className="account-container">
<Card>
<Card.Header>Update your Information</Card.Header>
<Card.Body>
<Card.Title>Update your Information</Card.Title> 
<Form className="add-new-listing">
<Form.Group
              as={Col}
              md="8"
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Mission Statement</Form.Label>
                <Form.Control as="textarea" rows={10} type="text"
                value={missionStatement}
                onChange={handleMissionStatementChange}
                placeholder="What would you like to tell the enaidle community about your organisation?"/>
              </Form.Group>
            </Form.Group>

            <Form.Group as={Col} md="8">
              <Form.Label>Website url</Form.Label>
              <Form.Control
                type="text"
                value={websiteUrl}
                onChange={handleWebsiteUrlChange}
                placeholder="Link to your organisation homepage"
              />
            </Form.Group>

            <Row className="mb-4">
              <Form.Group as={Col} md="8">
                <Form.Label> Address</Form.Label>
                <Form.Control
                  type="text"
                  value={address}
                  onChange={handleAddressChange}
                  placeholder="Your organisation HQ address"
                />
              </Form.Group>

              <Form.Group as={Col} md="4">
                <Form.Label>Logo url</Form.Label>
                <Form.Control
                  type="text"
                  value={logoUrl}
                  onChange={handleLogoUrlChange}
                  placeholder="Link to your logo"
                />
              </Form.Group>
            </Row>
          </Form>
        </Card.Body>

        <Button variant="custom" type="submit" value="Submit">
          Update
        </Button>
      </Card>
      {error && <div className="error">{error}</div>}
    </div> */
}

export default UpdateProfile;
