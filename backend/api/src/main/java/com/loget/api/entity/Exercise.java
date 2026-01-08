package com.loget.api.entity;

import jakarta.persistence.*;

import java.lang.module.FindException;
import java.time.LocalDateTime;

@Entity
public class Exercise {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long key;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private Users user;

    @Column(length = 100)
    private String exerciseName;
    private Integer exerciseMinutes;
    private LocalDateTime loggedAt;

}
