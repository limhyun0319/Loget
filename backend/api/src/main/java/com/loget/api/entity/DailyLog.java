package com.loget.api.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.apache.catalina.User;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@Table(name = "DailyLog", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"userId", "logDate"})
})
public class DailyLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long logId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private Users user;

    @Column(nullable = false)
    private LocalDate logDate;

    private Boolean fastingSuccess;
}