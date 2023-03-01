import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AccountProfile = () => {
    const navigate = useNavigate();
    const userId = JSON.parse(localStorage.getItem('orgUser')).id;
    if (!userId) {
        userId = JSON.parse(localStorage.getItem('orgUser')).orgUser._id;
    }

    const [profile, setProfile] = useState("");
    const [newestInfo, setNewestInfo] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            const response = await fetch('/api/org-users/' + userId);
            const json = await response.json();
            setProfile(json);

            const infoLength = json.info.length
            if (infoLength > 0) setNewestInfo(json.info[infoLength - 1]);
        }

        if (profile === "") fetchProfile();
    }, [profile, newestInfo])

    const handleEditClick = () => navigate('/profile/update', {state: {id: userId, info: newestInfo}});

    return (
        <div className="profileContainer">
            {newestInfo !== "" && <img src={newestInfo.logoUrl} alt="organisation logo" height="200"/>}
            
            <p>Organisation Name: {profile.organisationName}</p>
            {profile.charityNumber && <p>Charity Number: {profile.charityNumber}</p>}
            <p>Email Address: {profile.email}</p>

            <h4>Information:</h4>
            {newestInfo !== "" && (
                <div className="orgInfo">
                    <p>{newestInfo.missionStatement}</p>
                    <p><a href={newestInfo.websiteUrl}>{newestInfo.websiteUrl}</a></p>
                    <p>Address: {newestInfo.address}</p>
                </div>
            )}

            {userId && <button onClick={handleEditClick}>Update Profile</button>}
        </div>
    )     
}
 
export default AccountProfile;