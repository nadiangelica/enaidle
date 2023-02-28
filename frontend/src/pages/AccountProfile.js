import React, { useEffect, useState } from "react";

const AccountProfile = () => {
    const userId = JSON.parse(localStorage.getItem('orgUser')).id;

    const [profile, setProfile] = useState("");
    const [newestInfo, setNewestInfo] = useState("");
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            const response = await fetch('/api/orgUsers/' + userId);
            const json = await response.json();
            setProfile(json);

            const infoLength = json.info.length
            if (infoLength > 0) {
                setNewestInfo(json.info[infoLength - 1])
            }
        }

        if (profile === "") fetchProfile();
    }, [profile, newestInfo])

    const handleEditClick = () => {
        setEditMode(!editMode);
    }

    if (!editMode) {
        return (
            <div className="profileContainer">
                {console.log(editMode)}
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

    if (editMode) {
        return (
            <div className="profileContainer">
                Hello World
                {console.log(editMode)}
                {userId && <button onClick={handleEditClick}>Update Profile</button>}
            </div>
        )
    }   
}
 
export default AccountProfile;