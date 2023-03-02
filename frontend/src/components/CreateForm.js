import React from 'react';
import {useState, useEffect} from 'react';
import { useListingsContext } from '../hooks/useListingsContext';
import { useAuthContext } from '../hooks/useAuthContext';

const CreateForm = (props) => {
    const { dispatch } = useListingsContext();
    const { user } = useAuthContext();
    // const id = localStorage.getItem('id');
    let id;
    if (user) {
        id = user.id;
    };
    
    // call the id from the useAuthContext hook by destructuring i


    const [orgName, setOrgName] = useState('');


    // get request to get the org user's organisation name
    useEffect(() => {
        getOrgName();
    }, []);

    const getOrgName = async () => {
        const response = await fetch(`/api/org-users/${id}`);
        const json = await response.json();
        if (response.ok) {
            setOrgName(json.organisationName);
        } else {
            dispatch({ type: 'SET_ERROR', payload: json });
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        const { 
            title, 
            organisationName,
            description, 
            requirement, 
            firstLine, 
            city, 
            postcode, 
            neededByDate 
        } = e.target.elements;
        const listing = {
            title: title.value,
            description: description.value,
            organisationName: orgName,
            organisationId: id,
            requirement: requirement.value,
            address: {
                firstLine: firstLine.value,
                city: city.value,
                postcode: postcode.value
            },
            neededByDate: neededByDate.value
        }
        // props is passed in from ListingsFeed.js
        props.createListing(listing);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" />
            {/* <label htmlFor="organisationName">Organisation Name</label>
            <input type="text" name="organisationName" id="organisationName" value={orgName} onChange={getOrgName} /> */}
            <label htmlFor="description">Description</label>
            <input type="text" name="description" id="description" />
            <label htmlFor="requirement">Requirement</label>
            <select name="requirement" id="requirement">
            <option value="Volunteering">Volunteering</option>
            <option value="Donation of goods">Donation of goods</option>
            </select>
            <label htmlFor="firstLine">Address</label>
            <input type="text" name="firstLine" id="firstLine" />
            <label htmlFor="city">Town</label>
            <input type="text" name="city" id="city" />
            <label htmlFor="postcode">Postcode</label>
            <input type="text" name="postcode" id="postcode" />
            <label htmlFor="neededByDate">Needed By Date</label>
            <input type="date" name="neededByDate" id="neededByDate" />
            <button type="submit">{props.buttonTitle}</button>
        </form>
    )
}


export default CreateForm;