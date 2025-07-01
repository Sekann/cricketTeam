package com.madridunited.backend.repositories;

import com.madridunited.backend.models.Match;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MatchRepository extends JpaRepository<Match, Long> {
    // agregar consultas personalizadas más adelante
}
