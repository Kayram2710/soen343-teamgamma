package ca.concordia.smarthome;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/users")
public class UserController {

    @Autowired
    private UserService userService;

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
