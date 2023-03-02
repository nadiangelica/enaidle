const OrgUser = require("../models/orgUserModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "30m" });
}

const loginOrgUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const orgUser = await OrgUser.login(email, password);
        const token = createToken(orgUser._id);
        const id = orgUser._id
        res.status(200).json({ email, token, id, type:"org"});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const createOrgUser = async (req, res) => {
    const { organisationName, email, charityNumber, password } = req.body;

    try {
        const orgUser = await OrgUser.register(organisationName, email, charityNumber, password);

        const token = createToken(orgUser._id);
        const id = orgUser._id
        res.status(201).json({ orgUser, token, id, type:"org" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const updateOrgInfo = async (req, res) => {
    const { orgUserId, missionStatement, websiteUrl, logoUrl, address } = req.body;

    try {
        const orgUser = await OrgUser.findById({_id:orgUserId});
        orgUser.info.push({ missionStatement, websiteUrl, logoUrl, address});
        await orgUser.save();
        
        const token = createToken(orgUser._id);
        res.status(201).json({orgUser, token});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const findOrgUserById = async (req, res) => {
    const orgUserId = req.params.org_user_id;

    try {
        const orgUser = await OrgUser.findById({_id:orgUserId}, '-password');
        res.status(200).json(orgUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getAllOrgNames= async (req, res) => {
    try {
        const orgUser = await OrgUser.find({}, 'organisationName charityNumber');
        const sortedList = orgUser.sort((a, b) => a.organisationName.localeCompare(b.organisationName));
        res.status(200).json(sortedList);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    loginOrgUser, createOrgUser, findOrgUserById, getAllOrgNames, updateOrgInfo
};
