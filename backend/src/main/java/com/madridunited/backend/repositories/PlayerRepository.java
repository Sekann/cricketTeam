package com.madridunited.backend.repositories;

import com.madridunited.backend.models.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Long> {  // Cambiado a Long

}
