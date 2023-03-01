import React, { useEffect, useState } from "react";

const OrgList = () => {
    const [orgs, setOrgs] = useState([]);

    useEffect(() => {
        const fetchOrgs = async () => {
            const response = await fetch('/api/org-users');
            const json = await response.json();
            setOrgs(json);
        }
        if (orgs.length === 0) fetchOrgs();
    }, [orgs])

    return (
        <div>
            <h2>List of Organisations</h2>
            <h3>Charities</h3>
            {orgs.filter(org => org.charityNumber).map(org => (
                <div key={org._id}>
                    <a href={"/organisations/" + org._id}>{org.organisationName}</a>
                </div>
            ))}
            <h3>Other Organisations</h3>
            {orgs.filter(org => !org.charityNumber).map(org => (
                <div key={org._id}>
                    <a href={"/organisations/" + org._id}>{org.organisationName}</a>
                </div>
            ))}
        </div>
    )
}

export default OrgList;