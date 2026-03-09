package com.loget.api.controller;

import com.loget.api.dto.MainResponseDto;
import com.loget.api.service.MainService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class MainController {

    private final MainService mainService;

    @GetMapping("/main")
    public MainResponseDto getMainPage(
            @RequestParam Long userId,
            @RequestParam String date) {

        return mainService.getMainPageData(userId, date);
    }
}