import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

const OrgList = () => {
  const placeholderUrl = "https://via.placeholder.com/150x150?text=";
  const [orgs, setOrgs] = useState([]);

  useEffect(() => {
    const fetchOrgs = async () => {
      const response = await fetch("/api/org-users");
      const json = await response.json();
      const requests = json.map(async (org) => {
        const res = await fetch(`/api/org-users/${org._id}`);
        const data = await res.json();
        const info = data.info.reverse()[0];
        const logoUrl = info && info.logoUrl ? info.logoUrl : placeholderLogo(data);
        return { ...org, logoUrl };
      });
      const orgsWithLogos = await Promise.all(requests);

      const sortOrgsByPhoto = (a, b) => {
        if (!a.logoUrl.includes(placeholderUrl) && (b.logoUrl.includes(placeholderUrl))) {
          return -1;
        }
        if (a.logoUrl.includes(placeholderUrl) && (!b.logoUrl.includes(placeholderUrl))) {
          return 1;
        }
        return 0;
      }

      setOrgs(orgsWithLogos.sort(sortOrgsByPhoto));
    };
    if (orgs.length === 0) fetchOrgs();
  }, [orgs]);

  const placeholderLogo = (org) => {
    // return a placeholder logo if the organization has no logo
    return placeholderUrl + org.organisationName;
  };

  return (
    <div className="container">
      <div className="title">
        <h2>Our Partners</h2>
        <h7>
          Welcome to our community, where organisations and individuals come
          together to create a positive impact.{" "}
        </h7>
        <br></br>
        <h7>Here you can find out more! </h7>
      </div>
      <div className="sub-heading-title">
        <h3>Charities</h3>
      </div>
      <div className="row row-cols-1 row-cols-md-4 g-4">
        {orgs
          .filter((org) => org.charityNumber)
          .map((org) => (
            <div key={org._id}>
              <Link to={`/organisations/${org._id}`}>
                <img
                  src={org.logoUrl}
                  alt={org.organisationName}
                  className="w-100"
                />
              </Link>
            </div>
          ))}
      </div>

      <div className="portfolio-container 2">
        <div className="sub-heading-title">
          <h3>Other Organisations</h3>
        </div>
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {orgs
            .filter((org) => !org.charityNumber)
            .map((org) => (
              <div key={org._id}>
                <Link to={`/organisations/${org._id}`}>
                  <img
                    src={org.logoUrl}
                    alt={org.organisationName}
                    className="w-100"
                  />
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default OrgList;
