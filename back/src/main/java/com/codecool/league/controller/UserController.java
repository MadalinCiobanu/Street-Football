package com.codecool.league.controller;

import com.codecool.league.model.User;
import com.codecool.league.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{email}")
    public User getUserByEmail(@PathVariable("email") String email) {
        return userService.findByEmail(email);
    }

    @PostMapping("/")
    public User addUser (@RequestBody User user) {
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
