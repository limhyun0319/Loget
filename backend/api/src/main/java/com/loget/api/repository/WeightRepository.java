package com.loget.api.repository;

import com.loget.api.entity.Weight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface WeightRepository extends JpaRepository<Weight, Long> {
    Optional<Weight> findByDailyLog_LogId(Long logId);

    @Query("SELECT w FROM Weight w " +
            "WHERE w.dailyLog.user.userId = :userId " +
            "AND w.logDate <= :date " +
            "ORDER BY w.logDate DESC")
    Optional<Weight> findLatestWeightBeforeDate(
            @Param("userId") Long userId,
            @Param("date") LocalDate date);

    Optional<Weight> findFirstByDailyLog_User_UserIdAndLogDateLessThanEqualOrderByLogDateDesc(Long userId, LocalDate date);
}
