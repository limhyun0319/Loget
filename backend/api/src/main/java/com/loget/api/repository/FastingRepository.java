package com.loget.api.repository;

import com.loget.api.entity.Fasting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FastingRepository extends JpaRepository<Fasting, Long> {
}
