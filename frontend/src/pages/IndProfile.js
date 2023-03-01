import React, {useEffect, useState} from "react";
import './OrgProfile.css';

const IndProfile = () => {
    const [ind, setInd] = useState("");
    const [newestInfo, setNewestInfo] = useState("");

    useEffect(() => {
        const fetchInd = async () => {
            const indId = window.location.pathname.split('/')[2];
            const response = await fetch('/api/ind-users/' + indId);
            const json = await response.json();
            setInd(json);

            const infoLength = json.info.length
            if (infoLength > 0) {
                setNewestInfo(json.info[infoLength - 1])
            }
        }

        if (ind === "") {
            fetchInd()
        }
    }, [ind, newestInfo])

    return (
        <div className="profileContainer">
            {/* {newestInfo !== "" && <img src={newestInfo.logoUrl} alt="organisation logo" height="200"/>} */}
            
            <p>First Name: {ind.firstName}</p>
            {/* {org.charityNumber && <p>Charity Number: {org.charityNumber}</p>} */}
            {/* <p>Email Address: {org.email}</p> */}

            {newestInfo !== "" && (
                <div className="indInfo">
                    <p>{newestInfo.aboutMe}</p>
                    <p><a href={newestInfo.helpingWith}>{newestInfo.helpingWith}</a></p>
                    <p>joinDate: {newestInfo.joinDate}</p>
                </div>
            )}
        </div>
    )       
}

export default IndProfile;