import React, {useEffect, useState}from "react";

const OrgProfile = () => {
  const [org, setOrg] = useState("");

  useEffect(() => {
    const fetchOrg = async () => {
      const orgId = window.location.pathname.split('/')[2];
      const response = await fetch('/api/orgUsers/' + orgId);
      const json = await response.json();
      setOrg(json[0]);
    }

    if (org==='') {
      fetchOrg()
    }
  }, [org])

  return (
    <div> 
      {console.log(org)}
      <p>Organisation Name: {org.organisationName}</p>
      <p>Charity Number: {org.charityNumber}</p>
      <p>Email Address: {org.email}</p>
    </div>
  )       
}

export default OrgProfile;