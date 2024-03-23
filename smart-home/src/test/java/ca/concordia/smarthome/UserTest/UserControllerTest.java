package ca.concordia.smarthome.UserTest;

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
import ca.concordia.smarthome.UserService;
import static org.mockito.Mockito.*;


public class UserControllerTest {

    @Mock
    private UserService userService;

    @InjectMocks
    private UserController userController;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
    }

    @After
    public void cleanup() {
        // Cleanup resources, if any
    }

    @Test
    public void testAddProfile() {
        String userEmail = "test@test.com";
        Profile profile = new Profile(); // Assume Profile is a valid object.
        when(userService.createProfile(userEmail, profile)).thenReturn(profile);

        ResponseEntity<Profile> response = userController.addProfile(userEmail, profile);
        assertNotNull(response.getBody());
        verify(userService, times(1)).createProfile(userEmail, profile);
    }

    @Test
    public void testVerifyPin() {
        String userEmail = "test@test.com";
        ObjectId profileId = new ObjectId();
        String pin = "1234";
        when(userService.verifyPin(userEmail, profileId, pin)).thenReturn(true);

        ResponseEntity<?> response = userController.verifyPin(userEmail, profileId, pin);
        assertTrue((Boolean) response.getBody());
        verify(userService, times(1)).verifyPin(userEmail, profileId, pin);
    }

    @Test
    public void testEditProfile() {
        String userEmail = "test@test.com";
        ObjectId profileId = new ObjectId();
        Profile updatedProfile = new Profile(); // Assume updatedProfile is a valid object.
        when(userService.editProfile(userEmail, profileId, updatedProfile)).thenReturn(updatedProfile);

        ResponseEntity<Profile> response = userController.editProfile(userEmail, profileId, updatedProfile);
        assertNotNull(response.getBody());
        verify(userService, times(1)).editProfile(userEmail, profileId, updatedProfile);
    }

    @Test
    public void testGetProfiles() {
        String userEmail = "test@test.com";
        List<Profile> profiles = Arrays.asList(new Profile(), new Profile()); // Assume these are valid Profile objects.
        when(userService.getProfiles(userEmail)).thenReturn(profiles);

        ResponseEntity<List<Profile>> response = userController.getProfiles(userEmail);
        assertNotNull(response.getBody());
        verify(userService, times(1)).getProfiles(userEmail);
    }

    @Test
    public void testRemoveProfile() {
        String userEmail = "test@test.com";
        ObjectId profileId = new ObjectId();
        doNothing().when(userService).removeProfile(userEmail, profileId);

        ResponseEntity<?> response = userController.removeProfile(userEmail, profileId);
        assertNotNull(response);
        verify(userService, times(1)).removeProfile(userEmail, profileId);
    }

    @Test
    public void testGetAllUsers() {
        List<User> users = Arrays.asList(new User(), new User()); // Assume these are valid User objects.
        when(userService.allUsers()).thenReturn(users);

        ResponseEntity<List<User>> response = userController.getAllUsers();
        assertNotNull(response.getBody());
        verify(userService, times(1)).allUsers();
    }

    @Test
    public void testGetUser() {
        String email = "test@test.com";
        Optional<User> user = Optional.of(new User()); // Assume User is a valid object.
        when(userService.user(email)).thenReturn(user);

        ResponseEntity<Optional<User>> response = userController.getUser(email);
        assertNotNull(response.getBody());
        verify(userService, times(1)).user(email);
    }

    @Test
    public void testGetSignInResult() {
        String email = "test@test.com";
        String password = "password";
        when(userService.validSignin(email, password)).thenReturn(true);

        ResponseEntity<Boolean> response = userController.getSignInResult(email, password);
        assertTrue(response.getBody());
        verify(userService, times(1)).validSignin(email, password);
    }

    @Test
    public void testGetRegistrationResult() {
        String email = "test@test.com";
        String username = "username";
        String password = "password";
        when(userService.validRegistration(email, username, password)).thenReturn(true);

        ResponseEntity<Boolean> response = userController.getResgistrationResult(email, username, password);
        assertTrue(response.getBody());
        verify(userService, times(1)).validRegistration(email, username, password);
    }

    // Add more tests as necessary for the remaining methods
}
