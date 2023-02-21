const OrgUser = require("../models/orgUser");

const OrgUsersController = {
  Create: async (req, res) => {
    const existingOrgUser = await OrgUser.exists({ email: req.body.email });
    if (existingOrgUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const newOrgUser = new OrgUser(req.body);
    newOrgUser.save((err) => {
      if (err) {
        res.status(400).json({ message: err.message });
      } else {
        res.status(201).json({
          message: "Thanks! your account has been successfully created",
          org_user_id:req.org_user_id
        });
      };
    });
  },

//   FindUserById: (req, res) => {
//         // Extract user_id from params (Taken from :post_id in the url)
//         let user_id = req.params.user_id
//         // Use user_id to find particular post
//         User.findById({_id:user_id}, async (err, user) => {
//             if (err) {
//                 throw err;
//             }
//             // const token = await TokenGenerator.jsonwebtoken(req.user_id)
//             // returns a body containing the post object and token string
//             res.status(200).json({user});
//         });
//     },
};

module.exports = UsersController;