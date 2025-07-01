package com.madridunited.backend.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.time.LocalDate;

@Data
@Entity
@NoArgsConstructor
@Table(name = "matches")
public class Match {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "opponent_id")
    private Team opponent;

    private LocalDate date;

    private String location;

    private String result;

    private String summary;

    @Column(name = "best_batsman")
    private String bestBatsman;

    @Column(name = "best_bowler")
    private String bestBowler;

    @Column(name = "created_at", updatable = false)
    private Instant createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = Instant.now();
    }
}
