const { render } = require("ejs");
const { users } = require("../data/users");

const handleHomepage = (req, res) => {
  res.status(200).render("pages/homepage", { users: users });
};

const handleProfilePage = (req, res) => {
  const userID = req.params._id;
  const locateUserID = users.find((user) => user._id === userID);
  res.render("pages/profile", {
    user: locateUserID,
  });
};

module.exports = { handleHomepage, handleProfilePage };
