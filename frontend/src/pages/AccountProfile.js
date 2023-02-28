import React, { useEffect, useState } from "react";

const AccountProfile = () => {
    const userId = JSON.parse(localStorage.getItem('orgUser')).id;

    const [profile, setProfile] = useState("");
    const [newestInfo, setNewestInfo] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [missionStatement, setMissionStatement] = useState("");
    const [websiteUrl, setWebsiteUrl] = useState("");
    const [logoUrl, setLogoUrl] = useState("");
    const [address, setAddress] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const response = await fetch('/api/org-users/' + userId);
            const json = await response.json();
            setProfile(json);

            const infoLength = json.info.length
            if (infoLength > 0) {
                setNewestInfo(json.info[infoLength - 1]);
                setMissionStatement(json.info[infoLength - 1].missionStatement);
                setWebsiteUrl(json.info[infoLength - 1].websiteUrl);
                setAddress(json.info[infoLength - 1].address);
                setLogoUrl(json.info[infoLength - 1].logoUrl);
            }
        }

        if (profile === "") fetchProfile();
    }, [profile, newestInfo])

    const handleEditClick = () => {
        setEditMode(true);
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

    const handleSubmit = async (event) => {
        event.preventDefault();

        const updateProfile = async () => {
            const response = await fetch('/api/org-users/update-info', {
                method: 'post',
                body: JSON.stringify({
                    orgUserId: userId,
                    missionStatement: missionStatement,
                    websiteUrl: websiteUrl,
                    address: address,
                    logoUrl: logoUrl
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const json = await response.json();

            if (!response.ok) {
                setError(json.message);
            } else {
                window.location.reload(false);
            }
        }

        updateProfile();
    };

    const handleMissionStatementChange = (event) => {
        setMissionStatement(event.target.value);
    };

    const handleWebsiteUrlChange = (event) => {
        setWebsiteUrl(event.target.value);
    };

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };

    const handleLogoUrlChange = (event) => {
        setLogoUrl(event.target.value);
    };

    if (editMode) {
        return (
            <main>
                <h2 id="new-request-title">Update your Information</h2>
                <div className="container">
                <form className="updateInfoForm" onSubmit={handleSubmit}>
                    <div className="input-box">
                        <label id="form_label" htmlFor="mission-statement">
                            Mission Statement:
                        </label>
                        <textarea
                            rows="20" 
                            cols="50"
                            className="form_field"
                            id="mission-statement"
                            type="text"
                            defaultValue={missionStatement}
                            value={missionStatement}
                            onChange={handleMissionStatementChange}
                            placeholder="What would you like to tell our community about your organisation?"
                        />
                    </div>

                    <div className="input-box">
                        <label id="form_label" htmlFor="website-url">
                            Website URL:
                        </label>
                        <input
                            size="50"
                            className="form_field"
                            id="website-url"
                            type="text"
                            defaultValue={websiteUrl}
                            value={websiteUrl}
                            onChange={handleWebsiteUrlChange}
                            placeholder="Link to your organisation homepage"
                        />
                    </div>

                    <div className="input-box">
                        <label id="form_label" htmlFor="address">
                            Address:
                        </label>
                        <input
                            size="50"
                            className="form_field"
                            id="address"
                            type="text"
                            defaultValue={address}
                            value={address}
                            onChange={handleAddressChange}
                            placeholder="Your organisation HQ address"
                        />
                    </div>

                    <div className="input-box">
                        <label id="form_label" htmlFor="logo-url">
                            Logo URL:
                        </label>
                        <input
                            size="50"
                            className="form_field"
                            id="logo-url"
                            type="text"
                            defaultValue={logoUrl}
                            value={logoUrl}
                            onChange={handleLogoUrlChange}
                            placeholder="Link to your logo"
                        />
                    </div>

                    <input id="submit" type="submit" value="Submit" />
                </form>
                {error && <div className="error">{error}</div>}
                </div>
            </main>
        )
    }   
}
 
export default AccountProfile;