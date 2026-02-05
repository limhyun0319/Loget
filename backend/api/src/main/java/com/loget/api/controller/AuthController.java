package com.loget.api.controller;

import com.loget.api.dto.LoginRequest;
import com.loget.api.dto.LoginResponse;
import com.loget.api.dto.SignupRequest;
import com.loget.api.dto.UserResponse;
import com.loget.api.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")

public class AuthController {
    private final AuthService authService;

    // 회원가입
    @PostMapping("/signup")
    public UserResponse signup(@RequestBody SignupRequest req) {
        System.out.println(req.toString());
        return authService.signup(req);
    }

    // 로그인
    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest req) {
        return authService.login(req);
    }

}
