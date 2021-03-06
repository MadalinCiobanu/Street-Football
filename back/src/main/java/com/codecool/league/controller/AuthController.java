package com.codecool.league.controller;

import com.codecool.league.model.AuthResponse;
import com.codecool.league.model.User;
import com.codecool.league.model.UserCredentials;
import com.codecool.league.repository.UserRepository;
import com.codecool.league.security.JwtServices;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin("*")
@RequestMapping("/auth")
@AllArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtServices jwtServices;
    private final UserRepository userRepository;

    @PostMapping("/login")
    public AuthResponse login (@RequestBody UserCredentials userCredentials) {

        try {
            String email = userCredentials.getEmail();

            User user = userRepository.findByEmail(email).orElseThrow(
                    () -> new IllegalArgumentException("No User found with email: " + email)
            );

            // authenticationManager.authenticate calls loadUserByUsername in CustomUserDetailsService
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    email, userCredentials.getPassword()
            ));
            List<String> roles = authentication.getAuthorities()
                    .stream()
                    .map(GrantedAuthority::getAuthority)
                    .collect(Collectors.toList());

            String token = jwtServices.createToken(email, roles);

            return new AuthResponse(user.getId(), email, roles, token, user.getFirstName(), user.getLastName(), user.getPhone(), user.getTeam());

        } catch (AuthenticationException authException) {
            throw new BadCredentialsException("Invalid email or password");
        }

    }
}
