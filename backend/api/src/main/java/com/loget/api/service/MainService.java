package com.loget.api.service;

import com.loget.api.dto.ExerciseDto;
import com.loget.api.dto.MainResponseDto;
import com.loget.api.dto.MealDto;
import com.loget.api.entity.DailyLog;
import com.loget.api.entity.Exercise;
import com.loget.api.entity.Meal;
import com.loget.api.entity.Weight;
import com.loget.api.repository.DailyLogRepository;
import com.loget.api.repository.ExerciseRepository;
import com.loget.api.repository.MealRepository;
import com.loget.api.repository.WeightRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MainService {

    private final DailyLogRepository dailyLogRepository;
    private final WeightRepository weightRepository;
    private final MealRepository mealRepository;
    private final ExerciseRepository exerciseRepository;

    public MainResponseDto getMainPageData(Long userId, String dateStr) {
        // 프론트에서 온 "2026-03-09" 같은 문자열을 날짜 객체로 변환
        LocalDate date = LocalDate.parse(dateStr);

        // 1. 해당 유저와 날짜로 일지(DailyLog) 찾기
        // (주의: 레포지토리에 이 메서드가 있어야 합니다!)
        DailyLog dailyLog = dailyLogRepository.findByUser_UserIdAndLogDate(userId, date)
                .orElseThrow(() -> new IllegalArgumentException("해당 날짜의 기록이 없습니다."));

        Long logId = dailyLog.getLogId();

        // 2. 일지 번호(logId)로 몸무게 찾기
        Weight weight = weightRepository.findByDailyLog_LogId(logId).orElse(null);
        Double currentWeight = (weight != null) ? weight.getCurrentWeight().doubleValue() : null;

        // 3. 일지 번호로 식단 리스트 찾고 DTO로 변환하기
        List<Meal> meals = mealRepository.findByDailyLog_LogId(logId);
        List<MealDto> mealDtos = meals.stream()
                .map(m -> new MealDto(
                        m.getMealType().name(), // Enum 이름을 문자열로
                        m.getPhotoUrl(),
                        m.getMemo()
                ))
                .collect(Collectors.toList());

        // 4. 일지 번호로 운동 기록 찾고 DTO로 변환하기 (하루 1개 기준)
        Exercise exercise = exerciseRepository.findByDailyLog_LogId(logId).orElse(null);
        ExerciseDto exerciseDto = null;
        if (exercise != null) {
            exerciseDto = new ExerciseDto(exercise.getExerciseName(), exercise.getExerciseMinutes());
        }

        // 5. 드디어 모든 데이터를 아까 만든 바구니(MainResponseDto)에 담아서 리턴!
        return new MainResponseDto(logId, currentWeight, mealDtos, exerciseDto);
    }
}