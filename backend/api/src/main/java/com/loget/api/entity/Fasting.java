package com.loget.api.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Fasting {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long fastingId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private Users user;

    private LocalDateTime startTime;
    private LocalDateTime endTime;
}
