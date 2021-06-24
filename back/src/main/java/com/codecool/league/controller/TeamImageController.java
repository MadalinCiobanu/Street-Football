package com.codecool.league.controller;

import com.codecool.league.model.TeamImage;
import com.codecool.league.service.TeamImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;

@RestController
@CrossOrigin("*")
@RequestMapping("team/image")
public class TeamImageController {

    private final TeamImageService teamImageService;

    @Autowired
    public TeamImageController(TeamImageService teamImageService) {
        this.teamImageService = teamImageService;
    }

    @GetMapping("/{id}")
    public TeamImage getImage(@PathVariable long id) {
        TeamImage teamImage = teamImageService.getImage(id);
        teamImage.setData(Base64.getEncoder().encode(teamImage.getData()));
        return teamImage;
    }

    @PostMapping
    public TeamImage saveImage(@RequestParam("image") MultipartFile file) {

        try {
            TeamImage teamImage = new TeamImage();
            teamImage.setData(file.getBytes());
            return teamImageService.addImage(teamImage);
        } catch (IOException e) {
            e.printStackTrace();
        }
        throw new IllegalArgumentException("Invalid file");
    }

    @PutMapping
    public TeamImage editImage(@RequestBody TeamImage teamImage) {
        return teamImageService.addImage(teamImage);
    }
}
