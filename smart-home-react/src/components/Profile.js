import React, { useEffect, useState } from 'react';
import { createProfile, deleteProfile, getUserProfiles } from '../api/apiHelper';




const Profile = ({user}) => {
  const [profiles, setProfiles] = useState([]);
  const [newProfileName, setNewProfileName] = useState('');
  const [newProfileTemperature, setNewProfileTemperature] = useState('');
  const [isLoading, setIsLoading] = useState(true);

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
      setProfiles([...profiles, newProfile]); // Update local state
      setNewProfileName(newProfileName); // Reset input fields
      setNewProfileTemperature(newProfileTemperature);
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
        </div>
      ))}
    </div>
  );
};

export default Profile;
