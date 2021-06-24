package com.codecool.league.controller;

import com.codecool.league.model.Team;
import com.codecool.league.service.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("team")
public class TeamController {

    private final TeamService teamService;

    @Autowired
    public TeamController (TeamService teamService) {
        this.teamService = teamService;
    }

    @GetMapping("/{id}")
    public Team getTeam (@PathVariable long id) {
        return teamService.getTeam(id);
    }

    @GetMapping("/")
    public List<Team> getTeams() {
        return teamService.getTeams();
    }

    @PostMapping
    public Team addTeam (@RequestBody Team team) {
        return teamService.addTeam(team);
    }

    @PutMapping
    public Team editTeam (@RequestBody Team team) {
        return teamService.editTeam(team);
    }

    @DeleteMapping("{id}")
    public void deleteTeam (@PathVariable long id) {
        teamService.deleteTeam(id);
    }

}
