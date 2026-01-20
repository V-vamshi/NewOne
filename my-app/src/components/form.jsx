import React, { useState } from "react";

function UserForm() {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    userPassword: "",
    conformPassword: "",
    phoneNumber: "",
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = () => {
    console.log("Login clicked", formData);
  };

  const handleSignIn = () => {
    console.log("Sign-In clicked", formData);
  };

  const handleSignUp = () => {
    if (formData.userPassword !== formData.conformPassword) {
      alert("Passwords do not match!");
    } else {
      console.log("Sign-Up successful", formData);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <form>
        <label htmlFor="user-name">Name:</label>
        <input
          type="text"
          name="userName"
          id="user-name"
          value={formData.userName}
          onChange={handleChange}
        /><br/>

        <label htmlFor="user-email">Email:</label>
        <input
          type="text"
          name="email"
          id="user-email"
          value={formData.email}
          onChange={handleChange}
        /><br/>

        <label htmlFor="user-password">Password:</label>
        <input
          type="password"
          name="userPassword"
          id="user-password"
          value={formData.userPassword}
          onChange={handleChange}
        /><br/>

        <label htmlFor="conform-password">Confirm Password:</label>
        <input
          type="password"
          name="conformPassword"
          id="conform-password"
          value={formData.conformPassword}
          onChange={handleChange}
        /><br/>

        <label htmlFor="user-phonenumber">Phone Number:</label>
        <input
          type="text"
          name="phoneNumber"
          id="user-phonenumber"
          value={formData.phoneNumber}
          onChange={handleChange}
        /><br/>

        <div style={{ marginTop: "15px" }}>
          <button type="button" onClick={handleLogin}>
            Login
          </button>
          <button type="button" onClick={handleSignIn} id="sign-in">
            Sign-In
          </button>
          <button type="button" onClick={handleSignUp} id="sign-up">
            Sign-Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserForm;