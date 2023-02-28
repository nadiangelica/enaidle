const AccountProfile = () => {
    const userData = JSON.parse(localStorage.getItem('orgUser')).orgUser;
    
    return (
        <div>
            <p>Organisation Name: {userData.organisationName}</p>
            <p>Charity Number: {userData.charityNumber}</p>
            <p>Email Address: {userData.email}</p>
        </div>
    )       
}
 
export default AccountProfile;