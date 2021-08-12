package com.codecool.league.service;

import com.codecool.league.model.TeamApplication;
import com.codecool.league.repository.TeamApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeamApplicationService {

    private final TeamApplicationRepository teamApplicationRepository;

    @Autowired
    public TeamApplicationService(TeamApplicationRepository teamApplicationRepository) {
        this.teamApplicationRepository = teamApplicationRepository;
    }

    public List<TeamApplication> getTeamApplications(long teamId) {
        return teamApplicationRepository.findAllByTeamId(teamId);
    }

    public TeamApplication getApplication(long id) {
        return teamApplicationRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("No Application found with id: " + id));
    }

    public TeamApplication addApplication(TeamApplication teamApplication) {
        return teamApplicationRepository.save(teamApplication);
    }

    public void deleteApplication(long id) {
        teamApplicationRepository.deleteById(id);
    }
}
