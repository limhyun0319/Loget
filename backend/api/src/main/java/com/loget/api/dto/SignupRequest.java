package com.loget.api.dto;

import java.math.BigDecimal;

public record SignupRequest(
        String id,
        String password,
        String name,
        Integer height,
        BigDecimal startWeight,
        BigDecimal targetWeight
) {}