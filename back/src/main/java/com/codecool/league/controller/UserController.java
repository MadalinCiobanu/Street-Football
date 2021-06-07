package com.codecool.league.controller;

import com.codecool.league.model.User;
import com.codecool.league.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("user")
public class UserController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
        passwordEncoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @GetMapping("/{email}")
    public User getUserByEmail(@PathVariable("email") String email) {
        return userService.findByEmail(email);
    }

    @PostMapping("/")
    public User addUser (@RequestBody User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userService.addUser(user);
    }

    @PutMapping("/")
    public User editUser (@RequestBody User user) {
        return userService.editUser(user);
    }

    @DeleteMapping("/{id}")
    public void deleteUser (@PathVariable long id) {
        userService.deleteUser(id);
    }
}
