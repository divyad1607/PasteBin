package Pastebin.demo.Controller;

import Pastebin.demo.DTO.CreateUserRequest;
import Pastebin.demo.DTO.LoginRequest;
import Pastebin.demo.Entity.User;
import Pastebin.demo.Service.UserService;
import Pastebin.demo.config.JwtUtil;
import org.springframework.web.bind.annotation.*;

import java.util.Locale;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class UserController {

    private final UserService userService;

    // constructor injection
    public UserController(UserService userService) {
        this.userService = userService;
    }

    // REGISTER USER
    @PostMapping("/register")
    public Map<String, Object> register(@RequestBody CreateUserRequest request){
        User user = userService.createUser(request);

        return Map.of(
                "message","User created successfully",
                "userId",user.getId(),
                "username",user.getUsername()
        );
    }

    // LOGIN USER
    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody LoginRequest request) {

        User user = userService.login(request);

        String token = JwtUtil.generateToken(user.getUsername());

        return Map.of(
                "message", "Login successful",
                "token", token
        );
    }

}
