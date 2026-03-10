package com.loget.api.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Getter
@Setter

public class Weight {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long weightId;

    @Column(precision = 5, scale = 2)
    private BigDecimal currentWeight;

    private LocalDate logDate;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "logId", unique = true)
    private DailyLog dailyLog;
}
