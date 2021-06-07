package com.codecool.league.model;

import lombok.*;

import java.util.List;

@Getter @Setter
@Builder
@AllArgsConstructor @NoArgsConstructor
public class AuthResponse {

    private String email;
    private List<String> roles;
    private String token;

}
