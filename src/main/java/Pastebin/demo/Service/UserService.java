package Pastebin.demo.Service;

import Pastebin.demo.DTO.CreateUserRequest;
import Pastebin.demo.DTO.LoginRequest;
import Pastebin.demo.Entity.User;
import Pastebin.demo.Exception.NotFoundException;
import Pastebin.demo.Repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // REGISTER USER
    public User createUser(CreateUserRequest request){
        if (userRepository.findByUsername(request.getUsername()).isPresent()){
            throw new NotFoundException("User already exists");
        }
        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(request.getPassword());

        return userRepository.save(user);
    }

    // LOGIN USER
    public User login(LoginRequest request){
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(()-> new NotFoundException("Invalid username or password"));

        if (!user.getPassword().equals(request.getPassword())){
            throw new NotFoundException("Invalid");
        }
        return user;
    }
}