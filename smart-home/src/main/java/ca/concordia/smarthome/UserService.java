package ca.concordia.smarthome;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

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
        User user = new User(null, username, email, password);
        return userRepository.save(user) != null; 
    }
}
