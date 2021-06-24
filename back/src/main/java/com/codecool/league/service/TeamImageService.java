package com.codecool.league.service;

import com.codecool.league.model.TeamImage;
import com.codecool.league.repository.TeamImageRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@AllArgsConstructor
public class TeamImageService {

    private final TeamImageRepository teamImageRepository;

    public TeamImage addImage(TeamImage teamImage) {
        return teamImageRepository.save(teamImage);
    }

    public TeamImage getImage(long id) {
        return teamImageRepository.findById(id)
                .orElseThrow(
                        () -> new IllegalArgumentException("No team image found with id: " + id)
                );
    }
}
