package com.codecool.league.model;

import lombok.*;
import javax.persistence.*;
import javax.validation.constraints.*;

@Entity
@Getter @Setter
@NoArgsConstructor
@Table(name = "users", uniqueConstraints = {
        @UniqueConstraint(name = "user_email_unique", columnNames = "email")
})
public class User {

    @Id
    @SequenceGenerator(name = "user_sequence", sequenceName = "user_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_sequence")
    private long id;

    @NotNull @Size(min = 2)
    private String firstName;

    @NotNull @Size(min = 2)
    private String lastName;

    @NotNull @Size(min = 7, max = 15)
    private String phone;

    @Email
    private String email;

    @NotNull @Size(min = 3, max = 20)
    private String password;

    @NotNull @Transient
    private String confirmPassword;

}
