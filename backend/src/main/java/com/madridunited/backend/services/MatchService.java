package com.madridunited.backend.services;

import com.madridunited.backend.models.Match;
import com.madridunited.backend.repositories.MatchRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MatchService {

    private final MatchRepository matchRepository;

    public MatchService(MatchRepository matchRepository) {
        this.matchRepository = matchRepository;
    }

    public List<Match> getAllMatches() {
        return matchRepository.findAll();
    }

    public Optional<Match> getMatchById(Long id) {
        return matchRepository.findById(id);
    }

    public Match createMatch(Match match) {
        return matchRepository.save(match);
    }

    public Match updateMatch(Long id, Match updatedMatch) {
        return matchRepository.findById(id).map(match -> {
            match.setOpponent(updatedMatch.getOpponent());
            match.setDate(updatedMatch.getDate());
            match.setLocation(updatedMatch.getLocation());
            match.setResult(updatedMatch.getResult());
            match.setSummary(updatedMatch.getSummary());
            match.setBestBatsman(updatedMatch.getBestBatsman());
            match.setBestBowler(updatedMatch.getBestBowler());
            return matchRepository.save(match);
        }).orElseThrow(() -> new RuntimeException("Match not found"));
    }

    public void deleteMatch(Long id) {
        matchRepository.deleteById(id);
    }
}
