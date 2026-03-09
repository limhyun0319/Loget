package com.loget.api.entity;

import jakarta.persistence.*;
import lombok.Getter;

import java.lang.module.FindException;
import java.time.LocalDateTime;

@Entity
@Getter

public class Exercise {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long exerciseId;

    @Column(length = 100)
    private String exerciseName;

    private Integer exerciseMinutes;

    private LocalDateTime loggedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "logId")
    private DailyLog dailyLog;

}
