package com.loget.api.dto;

import java.math.BigDecimal;

public record UserResponse(
        Long userId,
        String id,
        String name,
        Integer height,
        BigDecimal startWeight,
        BigDecimal targetWeight
) {}