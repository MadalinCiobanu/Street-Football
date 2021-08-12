package com.codecool.league.model;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.*;

@Entity
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class TeamApplication {

    @Id
    @SequenceGenerator(name = "team_app_sequence", sequenceName = "team_app_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "team_app_sequence")
    private long id;

    @NotNull @Size(min = 5, max = 50)
    private String description;

    @OneToOne
    private User user;

    @ManyToOne
    private Team team;

}
