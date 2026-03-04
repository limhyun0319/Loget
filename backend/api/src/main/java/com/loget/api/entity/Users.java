package com.loget.api.entity;

import com.loget.api.entity.Exercise;
import com.loget.api.entity.Fasting;
import com.loget.api.entity.Meal;
import com.loget.api.entity.Weight;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Getter
@Setter
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(nullable = false, unique = true, length = 100)
    private String id;

    @Column(nullable = false, length = 255)
    private String password;

    @Column(length = 50)
    private String name;

    private Integer height;

    @Column(precision = 5, scale = 2)
    private BigDecimal targetWeight;

    @Column(precision = 5, scale = 2)
    private BigDecimal startWeight;
}