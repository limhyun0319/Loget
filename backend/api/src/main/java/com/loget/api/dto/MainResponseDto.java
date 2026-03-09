package com.loget.api.dto;

import java.util.List;

public record MainResponseDto(
        Long logId,
        Double currentWeight,
        List<MealDto> meals,
        ExerciseDto exercise
) {}