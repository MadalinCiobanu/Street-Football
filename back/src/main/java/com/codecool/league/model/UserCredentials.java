package com.codecool.league.model;

import lombok.*;

@Getter @Setter
@Builder
@AllArgsConstructor @NoArgsConstructor
public class UserCredentials {
    private String email;
    private String password;
}
