import React, { useEffect, useState } from 'react';
import { createProfile, deleteProfile, editProfile, getUserProfiles } from '../api/apiHelper';




const Profile = ({user}) => {
  const [profiles, setProfiles] = useState([]);
  const [newProfileName, setNewProfileName] = useState('');
  const [newProfileTemperature, setNewProfileTemperature] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [editProfileTemperature, setEditProfileTemperature] = useState('');
  const [editProfileName, setEditProfileName] = useState('');
  const [editProfileId , setEditProfileId] = useState('');

  useEffect(() => {
    if (!user) return; // If no userId, do nothing

    setIsLoading(true);
    getUserProfiles(user.email)
      .then(profiles => {
        setProfiles(profiles);
      })
      .catch(error => {
        console.error('Error fetching profiles:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [user.email]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await getUserProfiles(user); // Corrected to getUserProfiles
        setProfiles(response);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching profiles:', error);
        setIsLoading(false);
      }
    };
  
    fetchProfiles();
  }, []);
  

  const handleCreateProfile = async (e) => {
    e.preventDefault();
    try {
      const newProfile = { profileName: newProfileName, temperature: newProfileTemperature };
      await createProfile(user.email, newProfile);
      const updatedProfiles = await getUserProfiles(user);
      setProfiles(updatedProfiles); // Update local state with profiles from the database
      setNewProfileName(''); // Reset input fields
      setNewProfileTemperature('');
    } catch (error) {
      console.error('Error creating profile:', error);
    }
  };

  const handleDeleteProfile = async (profileId) => {
    try {
      await deleteProfile(user.email, profileId);
      console.log(profileId);
      setProfiles(profiles.filter(profile => profile.id !== profileId)); // Update local state
    } catch (error) {
      console.error('Error deleting profile:', error);
    }
  };

  const handleEditProfile = async (e) => {
    e.preventDefault();
    try {
      const updatedProfile = { name: editProfileName, temperature: editProfileTemperature };
      await editProfile(userEmail, editProfileId, updatedProfile);
      const updatedProfiles = await getUserProfiles(user);
      console.log(updatedProfiles); // Check the structure of the profiles
      setProfiles(updatedProfiles); // Update local state with profiles from the database
      setEditProfileId(''); // Reset input fields
      setEditProfileName('');
      setEditProfileTemperature('');
    } catch (error) {
      console.log("Profile Name " + editProfileName + " temp " + editProfileTemperature + " ID " + editProfileId + " email " + user.email)
      console.error('Error editing profile PROFILE.JS:', error);
    }
  };
  

  

  if (isLoading) {
    return <div>Loading...</div>; // Loading state
  }

  return (
      <div className="profile-container">
        <h1>User Profiles</h1>
        <form onSubmit={handleCreateProfile}>
          <input type="text" value={newProfileName} onChange={e => setNewProfileName(e.target.value)} placeholder="Profile Name" />
          <input type="number" value={newProfileTemperature} onChange={e => setNewProfileTemperature(e.target.value)} placeholder="Temperature" />
          <button type="submit">Add Profile</button>
        </form>
        {profiles.map(profile => (
          <div key={profile.id}>
            <p>{profile.name}: {profile.temperature}°C</p>
            <button onClick={() => handleDeleteProfile(profile.id)}>Delete</button>
            <button onClick={() => { setEditProfileId(profile.id); setEditProfileName(profile.name); setEditProfileTemperature(profile.temperature); }}>Edit</button>
            {editProfileId === profile.id && (
              <form onSubmit={handleEditProfile}>
                <input type="text" value={editProfileName} onChange={e => setEditProfileName(e.target.value)} placeholder="Profile Name" />
                <input type="number" value={editProfileTemperature} onChange={e => setEditProfileTemperature(e.target.value)} placeholder="Temperature" />
                <button type="submit">Update Profile</button>
              </form>
            )}
          </div>
        ))}
      </div>
  );
 }
export default Profile;