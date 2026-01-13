package com.loget.api.controller;

import com.loget.api.dto.LoginRequest;
import com.loget.api.dto.LoginResponse;
import com.loget.api.dto.SignupRequest;
import com.loget.api.dto.UserResponse;
import com.loget.api.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor

public class AuthController {
    private final AuthService authService;

    // 회원가입
    @PostMapping("/signup")
    public UserResponse signup(@RequestBody SignupRequest req) {
        return authService.signup(req);
    }

    // 로그인
    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest req) {
        return authService.login(req);
    }
}
