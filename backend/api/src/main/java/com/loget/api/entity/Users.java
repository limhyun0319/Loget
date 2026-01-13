package com.loget.api.entity;

import jakarta.persistence.*;
import jakarta.websocket.OnMessage;
import lombok.Getter;
import lombok.Setter;

import javax.swing.*;
import java.math.BigDecimal;
import java.util.List;

@Entity
@Getter
@Setter
public class Users {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    public long userId;

    @Column(nullable = false, length = 100)
    private String loginId;

    @Column(nullable = false, length = 255)
    private String password;

    @Column (length = 50)
    private String name;
    private Integer height;

    @Column(precision = 5, scale = 2)
    private BigDecimal targetWeight;

    @Column(precision = 5, scale = 2)
    private BigDecimal startWeight;

    @OneToMany(mappedBy = "user")
    private List<Meal> meals;

    @OneToMany (mappedBy = "user")
    private  List<Weight> weights;

    @OneToMany(mappedBy = "user")
    private List<Exercise> exercises;

    @OneToMany (mappedBy = "user")
    private List<Fasting> fastings;

}

