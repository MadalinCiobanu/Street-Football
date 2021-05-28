package com.codecool.league.service;

import com.codecool.league.model.Tournament;
import com.codecool.league.repository.TournamentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TournamentService {

    private final TournamentRepository tournamentRepository;

    @Autowired
    public TournamentService (TournamentRepository tournamentRepository) {
        this.tournamentRepository = tournamentRepository;
    }

    public Tournament addTournament (Tournament tournament) {
        return tournamentRepository.save(tournament);
    }

    public Tournament getTournament (long id) {
        return tournamentRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("No tournament found with id: " + id));
    }

    public List<Tournament> getAllTournaments () {
        return tournamentRepository.findAll();
    }

    public Tournament editTournament (Tournament tournament) {
        return tournamentRepository.save(tournament);
    }

    public void deleteTournament (long id) {
        tournamentRepository.deleteById(id);
    }

}
