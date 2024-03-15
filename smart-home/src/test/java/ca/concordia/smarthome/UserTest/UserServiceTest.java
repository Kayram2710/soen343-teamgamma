package ca.concordia.smarthome.UserTest;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import ca.concordia.smarthome.Profile;
import ca.concordia.smarthome.User;
import ca.concordia.smarthome.UserController;
import ca.concordia.smarthome.UserRepository;
import ca.concordia.smarthome.UserService;
import static org.mockito.Mockito.*;

public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    private User testUser;
    private Profile testProfile;
    private ObjectId testProfileId;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        testProfileId = new ObjectId();
        testProfile = new Profile();
        testProfile.setId(testProfileId); // Set an ObjectId for the test profile
        testUser = new User(); // Initialize with valid User object
        testUser.setProfiles(Arrays.asList(testProfile));
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(testUser));
    }

    @After
    public void cleanup() {
        // Clean up resources, if any
    }

    @Test
    public void testGetProfiles() {
        List<Profile> profiles = userService.getProfiles("test@test.com");
        assertNotNull(profiles);
        assertFalse(profiles.isEmpty());
    }

    @Test(expected = RuntimeException.class)
    public void testGetProfiles_UserNotFound() {
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.empty());
        userService.getProfiles("test@test.com");
    }

    @Test
    public void testVerifyPin() {
        testProfile.setCode("1234");
        boolean isVerified = userService.verifyPin("test@test.com", testProfileId, "1234");
        assertTrue(isVerified);
    }

    @Test(expected = RuntimeException.class)
    public void testVerifyPin_ProfileNotFound() {
        userService.verifyPin("test@test.com", new ObjectId(), "1234");
    }

    @Test
    public void testCreateProfile() {
        Profile newProfile = new Profile(); // Initialize with valid Profile object
        Profile createdProfile = userService.createProfile("test@test.com", newProfile);
        assertNotNull(createdProfile);
    }

    @Test(expected = RuntimeException.class)
    public void testCreateProfile_UserNotFound() {
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.empty());
        Profile newProfile = new Profile(); 
        userService.createProfile("nonexistent@test.com", newProfile);
    }

    @Test
    public void testRemoveProfile() {
        userService.removeProfile("test@test.com", testProfileId);
        verify(userRepository).save(any(User.class));
    }

    @Test
    public void testEditProfile() {
        Profile updatedProfileData = new Profile(); 
        Profile updatedProfile = userService.editProfile("test@test.com", testProfileId, updatedProfileData);
        assertNotNull(updatedProfile);
    }

    @Test
    public void testAllUsers() {
        List<User> users = Arrays.asList(new User(), new User());
        when(userRepository.findAll()).thenReturn(users);
        List<User> retrievedUsers = userService.allUsers();
        assertNotNull(retrievedUsers);
        assertFalse(retrievedUsers.isEmpty());
    }

    @Test
    public void testUser() {
        Optional<User> foundUser = userService.user("test@test.com");
        assertTrue(foundUser.isPresent());
    }

    @Test
    public void testValidSignin() {
        when(userRepository.findByEmailAndPassword(anyString(), anyString())).thenReturn(Optional.of(new User()));
        boolean isValid = userService.validSignin("test@test.com", "password");
        assertTrue(isValid);
    }

    @Test
    public void testValidRegistration() {
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.empty());
        when(userRepository.save(any(User.class))).thenReturn(new User());
        boolean isValid = userService.validRegistration("new@test.com", "username", "password");
        assertTrue(isValid);
    }

}
