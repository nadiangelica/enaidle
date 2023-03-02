const payload = await json.map(async (obj) => {
    const res = await fetch('/api/org-users/' + obj.organisationId);
    const data = await res.json();
    const info = data.info.reverse()[0];

    let profilePic;
    if (data.charityNumber) profilePic = "charity";
    else profilePic = "org";

    if (info && info.logoUrl !== "") profilePic = info.logoUrl;
    console.log(profilePic);
    return profilePic;
})