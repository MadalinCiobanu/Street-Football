package com.codecool.league.service;

import com.codecool.league.model.User;
import com.codecool.league.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public User findById(long userId) {
        return userRepository.findById(userId).orElseThrow(
                () -> new IllegalArgumentException("No User found with id: " + userId)
        );
    }


    public User findByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow(
                () -> new IllegalArgumentException("No User found with email: " + email)
        );
    }


    public User addUser(User user) {
        return userRepository.save(user);
    }


    public User editUser(User user) {
        return userRepository.save(user);
    }


    public void deleteUser(long id) {
        userRepository.deleteById(id);
    }
}
