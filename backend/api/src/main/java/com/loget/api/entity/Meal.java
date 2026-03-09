package com.loget.api.entity;

import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDateTime;

@Entity
@Getter

public class Meal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long mealId;

    @Enumerated(EnumType.STRING) // ENUM을 문자열로 DB에 저장
    private MealType mealType;

    private String photoUrl;

    @Column(columnDefinition = "TEXT")
    private String memo;

    private LocalDateTime loggedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "logId")
    private DailyLog dailyLog;

}
