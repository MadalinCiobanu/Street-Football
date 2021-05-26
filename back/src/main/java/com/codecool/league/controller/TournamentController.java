package com.codecool.league.controller;

import com.codecool.league.model.Tournament;
import com.codecool.league.service.TournamentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("tournament")
public class TournamentController {

    private final TournamentService tournamentService;

    @Autowired
    public TournamentController (TournamentService tournamentService) {
        this.tournamentService = tournamentService;
    }

    @GetMapping("/{id}")
    public Tournament getTournament (@PathVariable long id) {
        return tournamentService.getTournament(id);
    }

    @GetMapping("/")
    public List<Tournament> getAllTournaments () {
        return tournamentService.getAllTournaments();
    }

    @PostMapping("/")
    public Tournament addTournament (Tournament tournament) {
        return tournamentService.addTournament(tournament);
    }

    @PutMapping("/")
    public Tournament editTournament (Tournament tournament) {
        return tournamentService.editTournament(tournament);
    }

    @DeleteMapping("/{id}")
    public void deleteTournament (@PathVariable long id) {
        tournamentService.deleteTournament(id);
    }

}
