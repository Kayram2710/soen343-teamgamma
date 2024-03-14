import React, { useCallback, useEffect, useState } from 'react';
import { createProfile, deleteProfile, editProfile, getUserProfiles, verifyProfilePin } from '../api/apiHelper';




const Profile = ({user}) => {
  const [profiles, setProfiles] = useState([]);
  const [newProfileName, setNewProfileName] = useState('');
  const [newProfileHouseLocation, setNewProfileHouseLocation] = useState('');
  const [newProfileCode, setNewProfileCode] = useState('');
  const [newProfileisAdmin, setNewProfileisAdmin] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [editProfileHouseLocation, setEditProfileHouseLocation] = useState('');
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

  useEffect(() => {
    // Find the active profile
    const activeProfile = profiles.find(profile => profile.id === activeProfileId);
  
    // If the active profile exists, set isActiveProfileAdmin based on its isAdmin property
    if (activeProfile) {
      setIsActiveProfileAdmin(activeProfile.isAdmin === true);
    }
  }, [profiles, activeProfileId]);
  

  const handleCreateProfile = useCallback(async (e) => {
    e.preventDefault();
    try {
      const newProfile = { profileName: newProfileName, houseLocation: newProfileHouseLocation, code: newProfileCode, isAdmin: newProfileisAdmin};
      await createProfile(user.email, newProfile);
      const updatedProfiles = await getUserProfiles(user.email);
      setProfiles(updatedProfiles); // Update local state with profiles from the database
      setNewProfileName(''); // Reset input fields
      setNewProfileHouseLocation('');
      setNewProfileCode('');
      setNewProfileisAdmin(false);
    } catch (error) {
      console.error('Error creating profile:', error);
    }
  });

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
      const updatedProfile = { profileName: editProfileName, houseLocation: editProfileHouseLocation };
      await editProfile(user.email, editProfileId, updatedProfile);
      const updatedProfiles = await getUserProfiles(user.email);
      console.log(updatedProfiles); // Check the structure of the profiles
      setProfiles(updatedProfiles); // Update local state with profiles from the database
      setEditProfileId(''); // Reset input fields
      setEditProfileName('');
      setEditProfileHouseLocation('');
    } catch (error) {
      console.log("Profile Name " + editProfileName + " temp " + editProfileHouseLocation + " ID " + editProfileId + " email " + user.email)
      console.error('Error editing profile PROFILE.JS:', error);
    }
  };
  

  

  if (isLoading) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <div className="container mx-auto p-6 bg-white shadow-md">
      <h1 className="text-2xl font-semibold mb-5">User Profiles</h1>
      <form onSubmit={handleCreateProfile} className="mb-6 flex flex-wrap items-center gap-3">
        <input
          type="text"
          value={newProfileName}
          onChange={e => setNewProfileName(e.target.value)}
          placeholder="Profile Name"
          className="border p-2 rounded"
        />
        <input
          type="text"
          value={newProfileHouseLocation}
          onChange={e => setNewProfileHouseLocation(e.target.value)}
          placeholder="House Location"
          className="border p-2 rounded"
        />
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={newProfileisAdmin}
            onChange={e => setNewProfileisAdmin(e.target.checked)}
            className="mr-1"
          />
          Is Admin
        </label>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add Profile
        </button>
      </form>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {profiles.map(profile => (
          <div key={profile.id} className="bg-gray-100 p-4 rounded shadow">
            <h3 className="text-lg font-bold mb-2">{profile.profileName}</h3>
            <p>House Location: {profile.houseLocation}</p>
            <p>Admin: {profile.isAdmin ? 'Yes' : 'No'}</p>
            <p className="mb-4">Status: {activeProfileId === profile.id ? 'Active' : 'Inactive'}</p>
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => handleSetActiveProfile(profile)}
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded ${activeProfileId === profile.id ? 'hidden' : ''}`}
              >
                Login
              </button>
              <button
                onClick={handleClearActiveProfile}
                className={`bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded ${activeProfileId !== profile.id ? 'hidden' : ''}`}
              >
                Logout
              </button>
              <button
                onClick={() => handleDeleteProfile(profile.id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
              >
                Delete
              </button>
              <button
                onClick={() => { setEditProfileId(profile.id); setEditProfileName(profile.profileName); setEditProfileHouseLocation(profile.houseLocation); }}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded"
              >
                Edit
              </button>
            </div>
            {editProfileId === profile.id && (
              <form onSubmit={handleEditProfile} className="flex flex-wrap gap-2">
                <input
                  type="text"
                  value={editProfileName}
                  onChange={e => setEditProfileName(e.target.value)}
                  placeholder="Profile Name"
                  className="border p-2 rounded"
                />
                <input
                  type="text"
                  value={editProfileHouseLocation}
                  onChange={e => setEditProfileHouseLocation(e.target.value)}
                  placeholder="House Location"
                  className="border p-2 rounded"
                />
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Update Profile
                </button>
              </form>
            )}
          </div>
        ))}
      </div>
    </div>
  );
  
 }
export default Profile;