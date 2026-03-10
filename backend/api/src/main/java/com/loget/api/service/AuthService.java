package com.loget.api.service;

import com.loget.api.dto.LoginRequest;
import com.loget.api.dto.LoginResponse;
import com.loget.api.dto.SignupRequest;
import com.loget.api.dto.UserResponse;
import com.loget.api.entity.DailyLog;
import com.loget.api.entity.Users;
import com.loget.api.entity.Weight;
import com.loget.api.repository.DailyLogRepository;
import com.loget.api.repository.UserRepository;
import com.loget.api.repository.WeightRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.loget.api.entity.DailyLog;
import com.loget.api.entity.Weight;
import com.loget.api.repository.DailyLogRepository;
import java.time.LocalDate;
import java.time.LocalDate;

@Service
@RequiredArgsConstructor
@Transactional//생성자 자동 생성
public class AuthService {
    private final UserRepository userRepository;
    private final DailyLogRepository dailyLogRepository;
    private final WeightRepository weightRepository;

    //회원가입
    public UserResponse signup (SignupRequest req) {
        //중복 아이디 체크
        if (userRepository.existsById(req.id())) {
            throw new IllegalArgumentException("이미 존재하는 아이디입니다.");
        }
        //엔티티 생성
        Users user = new Users();
        user.setId(req.id());
        user.setPassword(req.password());
        user.setName(req.name());
        user.setHeight(req.height());
        user.setStartWeight(req.startWeight());
        user.setTargetWeight(req.targetWeight());
        //DB저장
        Users savedUser = userRepository.save(user);
        //오늘 날짜의 DailyLog 생성
        DailyLog dailyLog = new DailyLog();
        dailyLog.setUser(savedUser);
        dailyLog.setLogDate(LocalDate.now());
        dailyLog.setFastingSuccess(false);
        DailyLog savedDailyLog = dailyLogRepository.save(dailyLog);

        //시작 몸무게를 Weight 테이블에 저장
        if (req.startWeight() != null) {
            Weight initialWeight = new Weight();
            initialWeight.setDailyLog(savedDailyLog);
            initialWeight.setCurrentWeight(req.startWeight());
            initialWeight.setLogDate(LocalDate.now());

            weightRepository.save(initialWeight);
        }
        //실제 리턴값
        return new UserResponse(
                savedUser.getUserId(),
                savedUser.getId(),
                savedUser.getName(),
                savedUser.getHeight(),
                savedUser.getStartWeight(),
                savedUser.getTargetWeight()
        );
    }

    //로그인
    public LoginResponse login (LoginRequest req) {
        //아이디 확인
        Users user = userRepository.findById(req.id())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 아이디입니다."));
        //비밀번호 확인
        if (!user.getPassword().equals(req.password())) {
            throw new IllegalArgumentException("틀린 비밀번호입니다.");
        }
        //로그인 성공 시 유저 정보 응답 dto 생성
        UserResponse userResponse = new UserResponse(
                user.getUserId(),
                user.getId(),
                user.getName(),
                user.getHeight(),
                user.getStartWeight(),
                user.getTargetWeight()
        );
        //로그인 결과 반환
        return new LoginResponse(true, userResponse);
    }
}
