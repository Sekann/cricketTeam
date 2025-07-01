package com.madridunited.backend.models;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "teams")
public class Team {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(name = "logo_url")
    private String logoUrl;
}
