package com.loget.api.repository;

import com.loget.api.entity.Weight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WeightRepository extends JpaRepository<Weight, Long> {
    Optional<Weight> findByDailyLog_LogId(Long logId);
}
