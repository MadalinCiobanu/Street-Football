package com.codecool.league.model;

import lombok.*;

import java.util.List;

@Getter @Setter
@Builder
@AllArgsConstructor @NoArgsConstructor
public class AuthResponse {

    private long id;
    private String email;
    private List<String> roles;
    private String token;
    private String firstName;
    private String lastName;
    private String phone;
    private Team team;

}
