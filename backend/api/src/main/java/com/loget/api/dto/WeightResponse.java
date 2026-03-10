package com.loget.api.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public record WeightResponse(
        Long weightId,
        BigDecimal currentWeight
) {}
