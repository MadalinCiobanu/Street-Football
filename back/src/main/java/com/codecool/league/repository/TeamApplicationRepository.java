package com.codecool.league.repository;

import com.codecool.league.model.TeamApplication;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TeamApplicationRepository extends JpaRepository<TeamApplication, Long> {
    List<TeamApplication> findAllByTeamId (long teamId);
}
