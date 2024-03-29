package ca.concordia.smarthome;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
     @Autowired
    private UserRepository userRepository;

    public List<Profile> getProfiles(String userEmail) {
        Optional<User> userOptional = userRepository.findByEmail(userEmail);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            List<Profile> profiles = user.getProfiles();
            if (profiles != null) {
                return profiles;
            } else {
                throw new RuntimeException("No profiles found for user with email: " + userEmail);
            }
        } else {
            throw new RuntimeException("User not found with email, profiles: " + userEmail);
        }
    }

    public boolean verifyPin(String userEmail, ObjectId profileId, String pin) {
        Optional<User> userOptional = userRepository.findByEmail(userEmail);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            List<Profile> profiles = user.getProfiles();
            if (profiles != null) {
                for (Profile profile : profiles) {
                    if ((profile.getId().toString().equals(profileId.toHexString()))) {
                        System.out.println(profile.getId().toString());
                        System.out.println(profileId.toString());
                        System.out.println(profile.getCode());
                        System.out.println(pin);
                        if (profile.getCode().equals(pin)) {
                            return true;
                        }
                    }
                }
                throw new RuntimeException("Profile not found with id: " + profileId);
            } else {
                throw new RuntimeException("User has no profiles");
            }
        } else {
            throw new RuntimeException("User not found with email: " + userEmail);
        }
    }

    public Profile createProfile(String userEmail, Profile profile) {
        Optional<User> userOptional = userRepository.findByEmail(userEmail);
        if (userOptional.isPresent()) {
            Profile newProfile = new Profile();
            // Map ProfileData fields to newProfile
            newProfile.setProfileName(profile.getProfileName());
            newProfile.setHouseLocation(profile.getHouseLocation());
            newProfile.setCode(profile.getCode());
            newProfile.setId(new ObjectId()); 
    
            // Add profile to user and update user
            User user = userOptional.get();
            List<Profile> profiles = user.getProfiles();
            if (profiles == null) {
                profiles = new ArrayList<>();
            }
            profiles.add(newProfile);
            user.setProfiles(profiles);
            userRepository.save(user);
    
            return newProfile;
        } else {
            throw new RuntimeException("User not found with id: " + userEmail);
        }
    }

    public void removeProfile(String userEmail, ObjectId profileId) {
        Optional<User> userOptional = userRepository.findByEmail(userEmail);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            List<Profile> profiles = user.getProfiles();
            if (profiles != null) {
                for (Profile profile : profiles) {
                    if (profile.getId().toString().equals(profileId.toString())) {
                        profiles.remove(profile);
                        break;
                    }
                }
                System.out.println("size" + profiles.size());
                user.setProfiles(profiles);
                userRepository.save(user);
            }
        } else {
            throw new RuntimeException("User not found with id: " + userEmail);
        }
    }
    

    public Profile editProfile(String userEmail, ObjectId profileId, Profile ProfileData) {
        if (ProfileData == null) {
            throw new IllegalArgumentException("updatedProfileData cannot be null");
        }
    
        Optional<User> userOptional = userRepository.findByEmail(userEmail);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            List<Profile> profiles = user.getProfiles();
            if (profiles != null) {
                for (Profile profile : profiles) {
                    if (profile.getId().toString().equals(profileId.toString())) {
                        profile.setProfileName(ProfileData.getProfileName());
                        profile.setHouseLocation(ProfileData.getHouseLocation());
                        user.setProfiles(profiles);
                        userRepository.save(user);
                        return profile;
                    }
                }
                throw new RuntimeException("Profile not found with id: " + ProfileData.getId());
            } else {
                throw new RuntimeException("User has no profiles");
            }
        } else {
            throw new RuntimeException("User not found with email: " + userEmail);
        }
    }

    public Profile updatePerms(String userEmail, Object profileId, String permission){
        Optional<User> userOptional = userRepository.findByEmail(userEmail);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            List<Profile> profiles = user.getProfiles();
            if (profiles != null) {
                for (Profile profile : profiles) {
                    if (profile.getId().toString().equals(profileId.toString())) {
                        profile.setPerms(permission);
                        user.setProfiles(profiles);
                        userRepository.save(user);
                        System.out.println(("success"));
                        return profile;
                    }
                }
                throw new RuntimeException("Profile not found with id: " + profileId + (", userService"));
            } else {
                throw new RuntimeException("User has no profiles, userService");
            }
        } else {
            throw new RuntimeException("User not found with email: " + userEmail+ (", userService"));
        }
    }
    

    public List<User> allUsers(){
        return userRepository.findAll();
    }

    public Optional<User> user(String email){
        return userRepository.findByEmail(email);
    }

    public boolean validSignin(String email, String password){
        return !userRepository.findByEmailAndPassword(email, password).isEmpty();
    }  

    public boolean validRegistration(String email, String username, String password){
        if (userRepository.findByEmail(email).isPresent()) {
            return false; 
        }
        List<Profile> profiles = new ArrayList<>(); 
        User user = new User(null, username, email, password, profiles);   
        return userRepository.save(user) != null; 
    }
}
