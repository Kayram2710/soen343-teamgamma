import React, { useCallback, useEffect, useState } from 'react';
import { createProfile, deleteProfile, editProfile, getUserProfiles, verifyProfilePin } from '../api/apiHelper';




const Profile = ({user}) => {
  const [profiles, setProfiles] = useState([]);
  const [newProfileName, setNewProfileName] = useState('');
  const [newProfileTemperature, setNewProfileTemperature] = useState('');
  const [newProfileCode, setNewProfileCode] = useState('');
  const [newProfileisAdmin, setNewProfileisAdmin] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [editProfileTemperature, setEditProfileTemperature] = useState('');
  const [editProfileName, setEditProfileName] = useState('');
  const [editProfileId , setEditProfileId] = useState('');
  const [isActiveProfileAdmin, setIsActiveProfileAdmin] = useState(false);

  


  const [activeProfileId, setActiveProfileId] = useState(() => {
    // Get the stored active profile ID from local storage
    const savedProfileId = localStorage.getItem('activeProfileId');
    return savedProfileId || null;
  });

  const handleClearActiveProfile = useCallback(() => {
    // Remove the current active profile from local storage
    localStorage.removeItem('activeProfileId');
  
    // Find the first profile that is not the current active profile
    const newActiveProfile = profiles.find(profile => profile.id !== activeProfileId);
  
    // If such a profile exists, set it as the new active profile
    if (newActiveProfile) {
      setActiveProfileId(newActiveProfile.id);
      localStorage.setItem('activeProfileId', newActiveProfile.id);
    } else {
      // If no other profiles exist, clear the active profile ID
      setActiveProfileId(null);
    }
  }, [activeProfileId, profiles]);

  // Function to set a profile as active
  const handleSetActiveProfile = useCallback(async (profile) => {
    const enteredPin = prompt("Enter PIN for " + profile.profileName);
    if (enteredPin === null) return;

    try {
      const isValid = await verifyProfilePin(user.email, profile.id, enteredPin);
      if (isValid) {
        setActiveProfileId(profile.id);
        localStorage.setItem('activeProfileId', profile.id);
        setIsActiveProfileAdmin(profile.isAdmin === true);
      } else {
        alert('Incorrect PIN');
      }
    } catch (error) {
      console.error('Error during PIN verification:', error);
    }
  }, [user.email]);

 

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
        const response = await getUserProfiles(user.email); // Corrected to getUserProfiles
        setProfiles(response);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching profiles:', error);
        setIsLoading(false);
      }
    };
  
    fetchProfiles();
  }, []);
  

  const handleCreateProfile = useCallback(async (e) => {
    if (!isActiveProfileAdmin) {
      alert('Only admin profiles can add new profiles.');
      return;
    }
    e.preventDefault();
    try {
      const newProfile = { profileName: newProfileName, temperature: newProfileTemperature, code: newProfileCode, isAdmin: newProfileisAdmin};
      await createProfile(user.email, newProfile);
      const updatedProfiles = await getUserProfiles(user.email);
      setProfiles(updatedProfiles); // Update local state with profiles from the database
      setNewProfileName(''); // Reset input fields
      setNewProfileTemperature('');
      setNewProfileCode('');
      setNewProfileisAdmin(false);
    } catch (error) {
      console.error('Error creating profile:', error);
    }
  });

  const handleDeleteProfile = async (profileId) => {
    if (!isActiveProfileAdmin) {
      alert('Only admin profiles delete profiles.');
      return;
    }
    try {
      await deleteProfile(user.email, profileId);
      console.log(profileId);
      setProfiles(profiles.filter(profile => profile.id !== profileId)); // Update local state
    } catch (error) {
      console.error('Error deleting profile:', error);
    }
  };

  const handleEditProfile = async (e) => {
    if (!isActiveProfileAdmin) {
      alert('Only admin profiles can edit profiles.');
      return;
    }
    e.preventDefault();
    try {
      const updatedProfile = { profileName: editProfileName, temperature: editProfileTemperature };
      await editProfile(user.email, editProfileId, updatedProfile);
      const updatedProfiles = await getUserProfiles(user.email);
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
    <div className="container mx-auto p-6 bg-white shadow-md">
      <h1 className="text-2xl font-semibold mb-5">User Profiles</h1>
      <form onSubmit={handleCreateProfile} className="mb-6">
        <input
          type="text"
          value={newProfileName}
          onChange={e => setNewProfileName(e.target.value)}
          placeholder="Profile Name"
          className="border p-2 rounded mr-2"
        />
        <input
          type="text"
          value={newProfileCode}
          onChange={e => setNewProfileCode(e.target.value)}
          placeholder="Profile Code"
          className="border p-2 rounded mr-2"
        />
         <input
            type="checkbox"
            checked={newProfileisAdmin}
            onChange={e => setNewProfileisAdmin(e.target.checked)}
            className="mr-2"
        />
        <span>Is Admin</span>
        <input
          type="number"
          value={newProfileTemperature}
          onChange={e => setNewProfileTemperature(e.target.value)}
          placeholder="Temperature"
          className="border p-2 rounded mr-2"
        />
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add Profile
        </button>
      </form>
      {profiles.map(profile => (
        <div key={profile.id} className="border-b pb-4 mb-4">
        <p className="mb-2">
          {profile.profileName}: {profile.temperature}°C, is an admin: {profile.isAdmin ? 'Yes' : 'No'}
          {activeProfileId === profile.id ? ' (Active)' : ''}
        </p>
        {activeProfileId === profile.id ? (
          <button
            onClick={handleClearActiveProfile}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded mr-2"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => handleSetActiveProfile(profile)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mr-2"
          >
            Login
          </button>
        )}
          <button
            onClick={() => handleDeleteProfile(profile.id)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded mr-2"
          >
            Delete
          </button>
          <button
            onClick={() => { setEditProfileId(profile.id); setEditProfileName(profile.profileName); setEditProfileTemperature(profile.temperature); }}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded"
          >
            Edit
          </button>
          {editProfileId === profile.id && (
            <form onSubmit={handleEditProfile} className="mt-4">
              <input
                type="text"
                value={editProfileName}
                onChange={e => setEditProfileName(e.target.value)}
                placeholder="Profile Name"
                className="border p-2 rounded mr-2"
              />
              <input
                type="number"
                value={editProfileTemperature}
                onChange={e => setEditProfileTemperature(e.target.value)}
                placeholder="Temperature"
                className="border p-2 rounded mr-2"
              />
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Update Profile
              </button>
            </form>
          )}
        </div>
      ))}
    </div>
  );
  
 }
export default Profile;