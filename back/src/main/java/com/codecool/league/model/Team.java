package com.codecool.league.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import javax.persistence.*;
import javax.validation.constraints.*;
import java.util.List;

@Entity
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class Team {

    @Id
    @SequenceGenerator(name = "team_sequence", sequenceName = "team_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "team_sequence")
    private long id;

    @NotNull @Size(min = 3, max = 20)
    private String name;

    @NotNull
    private String teamAdminEmail;

    @OneToMany(mappedBy = "team")
    @JsonIgnoreProperties(value = {"team"})
    private List<TeamApplication> teamApplications;

    @OneToOne
    @JsonIgnoreProperties(value = {"team"})
    private TeamImage teamImage;

    @OneToMany(mappedBy = "team")
    @JsonIgnoreProperties(value = {"team"})
    private List<User> players;

}
