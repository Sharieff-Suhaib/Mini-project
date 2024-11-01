import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css";
import { jwtDecode } from "jwt-decode";
import { updateProfile } from "../services/api";
const getUserIdFromToken = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
  
    try {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
      return decodedToken.user_id; 
    } catch (error) {
      console.error("Failed to decode token", error);
      return null;
    }
  };
function Profile() {
  const userId = getUserIdFromToken();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/profile/${userId}`);
        const user = response.data;
        setUsername(user.username);
        setEmail(user.email);
        setPreviewImage(user.profile_img ? `http://localhost:5000/uploads/${user.profile_img}` : null);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchUserDetails();
  }, [userId]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("user_id", userId);
    formData.append("username", username);
    formData.append("email", email);
    if (password) formData.append("password", password);
    if (profileImage) formData.append("profileImage", profileImage);

    try {
        const response = await updateProfile(formData);
        if (response) { 
          alert("Profile updated successfully!");
          setPreviewImage(response.data.user.profile_img ? `http://localhost:5000/uploads/${response.data.user.profile_img}` : null);
        } else {
          throw new Error("Failed to update profile."); 
        }
      } catch (error) {
        console.error("Error updating profile:", error);
      } finally {
        setIsSubmitting(false);
      }
  };

  return (
    <div className="profile-container">
      <h2>Update Profile</h2>
      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            placeholder="New Password"
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label>Profile Image:</label>
          <input type="file" onChange={handleFileChange} className="input-field" />
          {previewImage && (
            <img src={previewImage} alt="Profile Preview" className="profile-preview" />
          )}
        </div>
        <button type="submit" disabled={isSubmitting} className="submit-button">
          {isSubmitting ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
}

export default Profile;
