package com.codecool.league.model;

import lombok.*;
import org.hibernate.annotations.Type;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TeamImage {

    @Id
    @SequenceGenerator(name = "team_image_sequence", sequenceName = "team_image_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "team_image_sequence")
    private long id;

    @Lob
    @Type(type = "org.hibernate.type.BinaryType")
    private byte[] data;

    @OneToOne
    private Team team;

}