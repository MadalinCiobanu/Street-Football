package com.codecool.league.controller;

import com.codecool.league.model.User;
import com.codecool.league.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("user")
@AllArgsConstructor
public class UserController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    @GetMapping("/")
    public List<User> getUsers() {
        return userService.getUsers();
    }

    @GetMapping("/{userId}")
    public User getSingleUser(@PathVariable("userId") long userId) {
        return userService.findById(userId);
    }

    @GetMapping("/{email}")
    public User getUserByEmail(@PathVariable("email") String email) {
        return userService.findByEmail(email);
    }

    @PostMapping
    public User addUser (@RequestBody @Valid User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userService.addUser(user);
    }

    @PutMapping
    public User editUser (@RequestBody @Valid User user) {
        return userService.editUser(user);
    }

    @DeleteMapping("/{id}")
    public void deleteUser (@PathVariable("id") long id) {
        userService.deleteUser(id);
    }
}
