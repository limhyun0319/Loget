package com.loget.api.dto;

public record MealDto(
        String mealType,
        String photoUrl,
        String memo
) {}