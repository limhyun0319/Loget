package com.loget.api.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public record WeightRequest(
        Long userId,
        BigDecimal currentWeight,
        String date
) {}

