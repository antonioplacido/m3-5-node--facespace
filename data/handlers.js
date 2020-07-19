const { render } = require("ejs");
const { users } = require("../data/users");

let currentUser = {};

const handleHomepage = (req, res) => {
  res.status(200).render("pages/homepage", { users: users });
};

const handleProfilePage = (req, res) => {
  const userID = req.params._id;
  const locateUserID = users.find((user) => user._id === userID);
  const userFriends = locateUserID.friends.map((friendID) => {
    return users.find((userObj) => {
      return userObj._id == friendID;
    });
  });
  res.render("pages/profile", {
    user: locateUserID,
    friends: userFriends,
  });
};

const handleSignin = (req, res) => {
  res.render("pages/signin", { currentUser: currentUser });
};

const handleName = (req, res) => {
  const firstName = users.find((login) => login.name === req.body.firstName);
  console.log(firstName);
  if (firstName === undefined) {
    res.status(404).send("No bueno amigo");
  } else {
    const userUrl = "users/" + firstName._id;
    res.status(200).redirect(userUrl);
    currentUser = firstName;
    console.log("Current user is:", currentUser);
  }
};

module.exports = {
  handleHomepage,
  handleProfilePage,
  handleSignin,
  handleName,
};
