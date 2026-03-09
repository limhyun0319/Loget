package com.loget.api.repository;

import com.loget.api.entity.DailyLog;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.Optional;

public interface DailyLogRepository extends JpaRepository<DailyLog, Long> {
    Optional<DailyLog> findByUser_UserIdAndLogDate(Long userId, LocalDate logDate);
}