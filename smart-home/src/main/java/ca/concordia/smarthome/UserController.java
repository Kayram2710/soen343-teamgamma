package ca.concordia.smarthome;

import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@CrossOrigin(origins = "http://localhost:3000") // Specify the frontend origin
@RequestMapping("/api/v1/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/{userEmail}/profiles")
    public ResponseEntity<Profile> addProfile(@PathVariable String userEmail, @RequestBody Profile profile) {
        Profile createdProfile = userService.createProfile(userEmail, profile);
        return ResponseEntity.ok(createdProfile);
    }

    @PostMapping("/{userEmail}/profiles/{profileId}/verifyPin/{Pin}")
    public ResponseEntity<?> verifyPin(@PathVariable String userEmail, @PathVariable ObjectId profileId, @PathVariable String Pin) {
        System.out.println("Pin is: " + Pin);
        System.out.println("profileId is: " + profileId);
        System.out.println("userEmail is: " + userEmail);
    String verifiedpin = Pin;
    boolean isVerified = userService.verifyPin(userEmail, profileId, verifiedpin);
    return ResponseEntity.ok(isVerified);
}


    @PutMapping("/{userEmail}/profiles/{profileId}")
    public ResponseEntity<Profile> editProfile(@PathVariable String userEmail, @PathVariable ObjectId profileId, @RequestBody Profile updatedProfileData) {
    Profile updatedProfile = userService.editProfile(userEmail, profileId, updatedProfileData);
    return ResponseEntity.ok(updatedProfile);
}

    @GetMapping("/{userEmail}/profiles")
    public ResponseEntity<List<Profile>> getProfiles(@PathVariable String userEmail) {
        List<Profile> profiles = userService.getProfiles(userEmail);
        return ResponseEntity.ok(profiles);
    }

    @DeleteMapping("/{userEmail}/profiles/{profileId}")
    public ResponseEntity<?> removeProfile(@PathVariable String userEmail, @PathVariable ObjectId profileId) {
        userService.removeProfile(userEmail, profileId);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers(){
        return new ResponseEntity<List<User>>(userService.allUsers(), HttpStatus.OK);
    }

    @GetMapping("/{email}")
    public ResponseEntity<Optional<User>> getUser(@PathVariable String email){
        return new ResponseEntity<Optional<User>>(userService.user(email), HttpStatus.OK);
    }

    @GetMapping("/{email}/{password}")
    public ResponseEntity<Boolean> getSignInResult(@PathVariable String email, @PathVariable String password){
        return new ResponseEntity<Boolean>(userService.validSignin(email, password), HttpStatus.OK);
    }
    @GetMapping("/{email}/{username}/{password}")
    public ResponseEntity<Boolean> getResgistrationResult(@PathVariable String email, @PathVariable String username, @PathVariable String password){
        return new ResponseEntity<Boolean>(userService.validRegistration(email,username,password), HttpStatus.OK); 
    }

}
