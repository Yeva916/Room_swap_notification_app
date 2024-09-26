// frontend/src/Profile.js
import React from 'react';

const Profile = ({ match }) => {
    const { usn } = match.params;

    return <h1>Welcome to your profile page, {usn}!</h1>;
};

export default Profile;
