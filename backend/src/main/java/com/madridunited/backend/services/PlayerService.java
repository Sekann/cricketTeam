package com.madridunited.backend.services;

import com.madridunited.backend.models.Player;
import com.madridunited.backend.repositories.PlayerRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PlayerService {

    private final PlayerRepository playerRepository;

    public PlayerService(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    public List<Player> getAllPlayers() {
        return playerRepository.findAll();
    }

    public Optional<Player> getPlayerById(Long id) {  // Cambiado a Long
        return playerRepository.findById(id);
    }

    public Player createPlayer(Player player) {
        return playerRepository.save(player);
    }

    public Player updatePlayer(Long id, Player updatedPlayer) {  // Cambiado a Long
        return playerRepository.findById(id).map(player -> {
            player.setFullName(updatedPlayer.getFullName());
            player.setNumber(updatedPlayer.getNumber());
            player.setRole(updatedPlayer.getRole());
            player.setImageUrl(updatedPlayer.getImageUrl());
            return playerRepository.save(player);
        }).orElseThrow(() -> new RuntimeException("Jugador no encontrado"));
    }

    public void deletePlayer(Long id) {  // Cambiado a Long
        playerRepository.deleteById(id);
    }
}
