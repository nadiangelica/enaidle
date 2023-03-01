import React from 'react';
import { useListingsContext } from '../hooks/useListingsContext';

const CreateForm = (props) => {
    const { dispatch } = useListingsContext();
    const id = localStorage.getItem('id');

    const handleSubmit = (e) => {
        e.preventDefault();
        const { title, organisationName, description, requirement, firstLine, city, postcode, neededByDate } = e.target.elements;
        const listing = {
            title: title.value,
            organisationName: organisationName.value,
            description: description.value,
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
            <label htmlFor="organisationName">Organisation Name</label>
            <input type="text" name="organisationName" id="organisationName" />
            <label htmlFor="description">Description</label>
            <input type="text" name="description" id="description" />
            <label htmlFor="requirement">Requirement</label>
            <select>Requirement
            <option value="volunteering">Volunteering</option>
            <option value="donation">Donation of goods</option>
            </select>
            <label htmlFor="firstLine">Address</label>
            <input type="text" name="firstLine" id="firstLine" />
            <label htmlFor="city">City</label>
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