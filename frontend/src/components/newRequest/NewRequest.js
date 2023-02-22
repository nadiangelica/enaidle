import React, { useState } from "react";

const NewRequestForm = ({ navigate }) => {
  const [organisationName, setorganisationName] = useState("");
  const [title, setTitle] = useState("");
  const [requirement, setRequirement] = useState("requirement");
  const [description, setDescription] = useState("");
  const [firstLine, setFirstLine] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [neededByDate, setneededByDate] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // '/users' to be amended when we have clarity of route path for backend
    const response = await fetch("/users", {
      method: "POST",
      body: JSON.stringify({
        organisationName: organisationName,
        title: title,
        requirement: requirement,
        description: description,
        firstLine: firstLine,
        city: city,
        postcode: postcode,
        neededByDate: neededByDate,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.message);
    } else {
      console.log("yay");
      let data = await response.json();
      console.log(data);
      window.localStorage.setItem("token", data.token);
      window.localStorage.setItem("org_user_id", data.org_user_id);
      //  navigate 
      navigate("/listings");
    }
  };

  const handleOrganisationNameChange = (event) => {
    setorganisationName(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleRequirementChange = (event) => {
    setRequirement(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleFirstLineChange = (event) => {
    setFirstLine(event.target.value);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handlePostcodeChange = (event) => {
    setPostcode(event.target.value);
  };

  const handleNeededByDateChange = (event) => {
    setneededByDate(event.target.value);
  };

  return (
    <main>
      <h2 id="new-request-title">Add A Request</h2>
      <div className="container">
        <form className="newRequestForm" onSubmit={handleSubmit}>
          <div className="input-box">
            <label id="form_label" htmlFor="organisation-name">
              Organisation Name
            </label>
            <input
              className="form_field"
              id="organisation-name"
              type="text"
              value={organisationName}
              onChange={handleOrganisationNameChange}
              placeholder="Cancer Research"
            />
            <i></i>
          </div>

          <div className="input-box">
            <label id="form_label" htmlFor="title">
              Title
            </label>
            <input
              className="form_field"
              id="title"
              type="text"
              value={title}
              onChange={handleTitleChange}
              placeholder="What do you need?"
            />
            <i></i>
          </div>

          <div className="input-box">
            <label id="form_label" htmlFor="requirement">
              Do you require volunteering or donation of goods?
              <select value={requirement} onChange={handleRequirementChange}>
              <option value="requirement">Volunteering</option>
              <option value="resources">Donation of Goods</option>
              </select>
            </label>
            <i></i>
          </div>

          <div className="input-box">
            <label id="form_label" htmlFor="description">
              Description
            </label>
            <input
              className="form_field"
              id="description"
              type="text"
              value={description}
              onChange={handleDescriptionChange}
              placeholder="E.g. 2 volunteers to help running of soup kitchen"
            />
            <i></i>
          </div>

          {/* -----------------address------------------- */}

          <div className="input-box">
            <label id="form_label" htmlFor="first-line">
              First Line of Address
            </label>
            <input
              className="form_field"
              id="first-line"
              type="text"
              value={firstLine}
              onChange={handleFirstLineChange}
              placeholder="2 Redman Place"
            />
            <i></i>
          </div>

          <div className="input-box">
            <label id="form_label" htmlFor="city">
              City
            </label>
            <input
              className="form_field"
              id="city"
              type="text"
              value={city}
              onChange={handleCityChange}
              placeholder="London"
            />
            <i></i>
          </div>

          <div className="input-box">
            <label id="form_label" htmlFor="postcode">
              Postcode
            </label>
            <input
              className="form_field"
              id="postcode"
              type="text"
              value={postcode}
              onChange={handlePostcodeChange}
              placeholder="E20 1JQ"
            />
            <i></i>
          </div>

          <div className="input-box">
            <label id="form_label" htmlFor="neededByDate">
              Date Needed By
            </label>
            <input
              className="form_field"
              id="neededByDate"
              type="date"
              value={neededByDate}
              onChange={handleNeededByDateChange}
            />
            <i></i>
          </div>

          <input id="submit" type="submit" value="Submit" />
        </form>
        {error && <div className="error">{error}</div>}
      </div>
    </main>
  );
};

export default NewRequestForm;
