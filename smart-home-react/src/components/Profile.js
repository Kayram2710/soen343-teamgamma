import React from 'react';

const Profile = ({ user }) => {
  // You can structure the user object according to your application's data model
  // Example user object: { name: '', email: '', bio: '', profilePicture: '' }

  return (
    <div className="profile-container" style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <h1>Profile</h1>
      <div className="profile-details" style={{ textAlign: 'center' }}>
        {user.profilePicture ? (
          <img src={user.profilePicture} alt="Profile" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
        ) : (
          <div style={{ width: '150px', height: '150px', borderRadius: '50%', backgroundColor: '#ddd', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            No Image
          </div>
        )}
        <h2>{user.name || 'Your Name'}</h2>
        <p>Email: {user.email || 'your.email@example.com'}</p>
        <p>Bio: {user.bio || 'No bio provided'}</p>
        {/* Add more fields as necessary */}
      </div>
    </div>
  );
};

export default Profile;
