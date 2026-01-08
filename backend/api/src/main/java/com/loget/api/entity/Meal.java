package com.loget.api.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity

public class Meal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long mealId;

    @ManyToOne (fetch = FetchType.LAZY)
    @JoinColumn (name = "userId")
    private Users user;

    @Enumerated(EnumType.STRING)
    private MealType mealType; // 아침, 점심, 저녁, 간식

    private String photoUrl;

    @Column(columnDefinition = "TEXT")
    private String memo;

    private LocalDateTime loggedAt;

}
