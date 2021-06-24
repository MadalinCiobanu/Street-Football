package com.codecool.league.controller;

import com.codecool.league.model.Password;
import com.codecool.league.model.User;
import com.codecool.league.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@CrossOrigin("*")
@RequestMapping("user")
@AllArgsConstructor
public class UserController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;


    @GetMapping("/{email}")
    public User getUserByEmail(@PathVariable("email") String email) {
        return userService.findByEmail(email);
    }

    @PutMapping("/{email}")
    public void changePassword (@RequestBody Password password, @PathVariable("email") String email) {
        User user = userService.findByEmail(email);
        if (passwordEncoder.matches(password.getOld(), user.getPassword())) {
            user.setPassword(passwordEncoder.encode(password.getPassword()));
            userService.addUser(user);
        } else {
            throw new BadCredentialsException("Wrong password");
        }
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
