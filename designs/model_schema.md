# Data Design


## Organisation

```javascript
// auth ??

{
    "_id": ObjectId(),
    "name": String,
    // charity number
    "description": String,
    "category": String,
    "primaryLocation": {
        "type": "Point",
        "coordinates": [longitude, latitude]
    },
    "postcode": String,
    "opportunities": [ObjectId()],   
    "organisers": [ObjectId()], 
    "feed_postings":  [ObjectId()], // Not sure what to put in feed postings model yet       
}
```

## Opportunity

```javascript
{
    "_id": ObjectId(),
    "name": String,
    "type": String,
    "dateTime": Date,   
    "organiser_id": ObjectId(), 
    "location": {
        "type": "Point",
        "coordinates": [longitude, latitude]
    }, 
    "postcode": String,
    "organisation_id": ObjectId(), 
    "volunteers": [ObjectId()],    
    "allocation": Number        
}

```

## Organiser  ???

```javascript

{
    "_id": ObjectId(),
    "name": String,
    // password_hash
    // think about validation process 
    "contact_info": String, // not sure which info to specifically use
    "organisation_id": ObjectId() 
    // eventually would need approvals, messages?
}
```

## Volunteer

```javascript
{
    "_id": ObjectId(),
    // internal auth - username, password_hash, email
    "name": String,
    "mobile_number": String, 
    "opportunities": [ObjectId()],
    "saved_opportunities": [ObjectId()],
    "saved_organisations": [ObjectId()], 
    // eventually would need requests, messages, comments?
}

```