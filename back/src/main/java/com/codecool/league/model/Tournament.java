package com.codecool.league.model;

import lombok.*;
import javax.persistence.*;
import javax.validation.constraints.*;
import java.util.List;

@Entity
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class Tournament {

    @Id
    @SequenceGenerator(name = "tournament_sequence", sequenceName = "tournament_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "tournament_sequence")
    private long id;

    @Size(min = 3, max = 20) @NotNull
    private String name;

    @OneToMany
    private List<Team> teams;

}
