const bcrypt = require("bcrypt");
const User = require("../models/profile");

const updateProfile = async (req, res) => {
  const { user_id } = req.body;
  const { username, email, password } = req.body;
  const profileImage = req.file ? req.file.filename : null;

  try {
    const fieldsToUpdate = {};
    if (username) fieldsToUpdate.username = username;
    if (email) fieldsToUpdate.email = email;
    if (profileImage) fieldsToUpdate.profile_img = profileImage;
    if (password) fieldsToUpdate.password = await bcrypt.hash(password, 10);

    const updatedUser = await User.updateUser(user_id, fieldsToUpdate);
    if (updatedUser) {
      res.json({ message: "Profile updated successfully", user: updatedUser });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating profile" });
  }
};

module.exports = {
  updateProfile,
};
