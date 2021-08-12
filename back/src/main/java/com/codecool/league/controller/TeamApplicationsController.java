package com.codecool.league.controller;

import com.codecool.league.model.TeamApplication;
import com.codecool.league.service.TeamApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("application")
public class TeamApplicationsController {

    private final TeamApplicationService teamApplicationService;

    @Autowired
    public TeamApplicationsController (TeamApplicationService teamApplicationService) {
        this.teamApplicationService = teamApplicationService;
    }

    @GetMapping("/team/{id}")
    public List<TeamApplication> getTeamApplications (@PathVariable long id) {
        return teamApplicationService.getTeamApplications(id);
    }

    @GetMapping("/{id}")
    public TeamApplication getApplication (@PathVariable long id) {
        return teamApplicationService.getApplication(id);
    }

    @PostMapping
    public TeamApplication addApplication (@RequestBody TeamApplication teamApplication) {
        return teamApplicationService.addApplication(teamApplication);
    }

    @PutMapping
    public TeamApplication editApplication (@RequestBody TeamApplication teamApplication) {
        return teamApplicationService.addApplication(teamApplication);
    }

    @DeleteMapping("/{id}")
    public void deleteApplication (@PathVariable long id) {
        teamApplicationService.deleteApplication(id);
    }
}
