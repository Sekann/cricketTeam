package com.madridunited.backend.services;

import com.madridunited.backend.models.Team;
import com.madridunited.backend.repositories.TeamRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TeamService {

    private final TeamRepository teamRepository;

    public TeamService(TeamRepository teamRepository) {
        this.teamRepository = teamRepository;
    }

    public List<Team> getAllTeams() {
        return teamRepository.findAll();
    }

    public Optional<Team> getTeamById(Long id) {
        return teamRepository.findById(id);
    }

    public Team createTeam(Team team) {
        return teamRepository.save(team);
    }

    public Team updateTeam(Long id, Team updatedTeam) {
        return teamRepository.findById(id).map(team -> {
            team.setName(updatedTeam.getName());
            team.setLogoUrl(updatedTeam.getLogoUrl());
            return teamRepository.save(team);
        }).orElseThrow(() -> new RuntimeException("Team not found"));
    }

    public void deleteTeam(Long id) {
        teamRepository.deleteById(id);
    }
}
