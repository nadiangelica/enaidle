import React, {useEffect, useState} from "react";
import './OrgProfile.css';

const OrgProfile = () => {
    const [org, setOrg] = useState("");
    const [newestInfo, setNewestInfo] = useState("");

    useEffect(() => {
        const fetchOrg = async () => {
            const orgId = window.location.pathname.split('/')[2];
            const response = await fetch('/api/org-users/' + orgId);
            const json = await response.json();
            setOrg(json);

            const infoLength = json.info.length
            if (infoLength > 0) {
                setNewestInfo(json.info[infoLength - 1])
            }
        }

        if (org === "") {
            fetchOrg()
        }
    }, [org, newestInfo])

    return (
        <div className="profileContainer">
            {newestInfo !== "" && <img src={newestInfo.logoUrl} alt="organisation logo" height="200"/>}
            
            <p>Organisation Name: {org.organisationName}</p>
            {org.charityNumber && <p>Charity Number: {org.charityNumber}</p>}
            <p>Email Address: {org.email}</p>

            {newestInfo !== "" && (
                <div className="orgInfo">
                    <p>{newestInfo.missionStatement}</p>
                    <p><a href={newestInfo.websiteUrl}>{newestInfo.websiteUrl}</a></p>
                    <p>Address: {newestInfo.address}</p>
                </div>
            )}
        </div>
    )       
}

export default OrgProfile;