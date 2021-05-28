package com.codecool.league.service;

import com.codecool.league.model.Team;
import com.codecool.league.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeamService {

    private final TeamRepository teamRepository;

    @Autowired
    public TeamService (TeamRepository teamRepository) {
        this.teamRepository = teamRepository;
    }

    public Team addTeam (Team team) {
        return teamRepository.save(team);
    }

    public Team editTeam (Team team) {
        return teamRepository.save(team);
    }

    public Team getTeam (long id) {
        return teamRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("No team found with id: " + id));
    }

    public List<Team> getTeams () {
        return teamRepository.findAll();
    }

    public void deleteTeam (long id) {
        teamRepository.deleteById(id);
    }

}
