package com.loget.api.service;

import com.loget.api.dto.WeightRequest;
import com.loget.api.dto.WeightResponse;
import com.loget.api.entity.DailyLog;
import com.loget.api.entity.Users;
import com.loget.api.entity.Weight;
import com.loget.api.repository.DailyLogRepository;
import com.loget.api.repository.UserRepository;
import com.loget.api.repository.WeightRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)

public class WeightService {
    private final UserRepository userRepository;
    private final DailyLogRepository dailyLogRepository;
    private final WeightRepository weightRepository;

    /**
     * GET /weight - 특정 날짜의 몸무게 조회
     * 기록이 없으면 그 날짜 전의 가장 최근 몸무게 반환
     */
    public WeightResponse getWeight(Long userId, String dateStr) {
        LocalDate date = LocalDate.parse(dateStr);

        // 해당 날짜 이전의 가장 최근 몸무게 찾기
        Weight weight = weightRepository.findFirstByDailyLog_User_UserIdAndLogDateLessThanEqualOrderByLogDateDesc(userId, date).orElse(null);

        if (weight == null) {
            //기록이 없으면 null 반환
            return new WeightResponse(null, null);
        }

        return new WeightResponse(
                weight.getWeightId(),
                weight.getCurrentWeight()
        );
    }

    /**
     * POST /weight - 몸무게 기록 저장/수정
     * 해당 날짜에 이미 데이터가 있으면 Update, 없으면 Insert
     */
    @Transactional
    public WeightResponse saveWeight(WeightRequest request) {
        // 1. 사용자 확인
        Users user = userRepository.findById(request.userId())
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        LocalDate date = LocalDate.parse(request.date());

        // 2. 해당 날짜의 DailyLog 찾기 (없으면 생성)
        DailyLog dailyLog = dailyLogRepository
                .findByUser_UserIdAndLogDate(user.getUserId(), date)
                .orElseGet(() -> createDailyLog(user, date));

        // 3. 해당 날짜의 Weight 찾기
        Weight weight = weightRepository
                .findByDailyLog_LogId(dailyLog.getLogId())
                .orElse(null);

        // 4. Update 또는 Insert
        if (weight != null) {
            // 이미 있으면 Update
            weight.setCurrentWeight(request.currentWeight());
        } else {
            // 없으면 Insert
            weight = new Weight();
            weight.setDailyLog(dailyLog);
            weight.setLogDate(date);
            weight.setCurrentWeight(request.currentWeight());
        }

        // 5. 저장
        Weight savedWeight = weightRepository.save(weight);

        return new WeightResponse(
                savedWeight.getWeightId(),
                savedWeight.getCurrentWeight()
        );
    }

    /**
     * DailyLog 생성 헬퍼 메서드
     */
    @Transactional
    public DailyLog createDailyLog(Users user, LocalDate date) {
        DailyLog dailyLog = new DailyLog();
        dailyLog.setUser(user);
        dailyLog.setLogDate(date);
        dailyLog.setFastingSuccess(false);
        return dailyLogRepository.save(dailyLog);
    }
}
