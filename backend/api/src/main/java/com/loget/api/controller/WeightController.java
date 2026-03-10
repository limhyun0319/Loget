package com.loget.api.controller;

import com.loget.api.dto.WeightRequest;
import com.loget.api.dto.WeightResponse;
import com.loget.api.service.WeightService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping
@RequiredArgsConstructor

public class WeightController {
    private final WeightService weightService;

    /**
     * GET /api/weight
     * 특정 날짜의 몸무게 조회
     */
    @GetMapping("/weight")
    public ResponseEntity<WeightResponse> getWeight(
            @RequestParam Long userId,
            @RequestParam String date) {
        WeightResponse response = weightService.getWeight(userId, date);
        return ResponseEntity.ok(response);
    }

    /**
     * POST /api/weight
     * 몸무게 기록 저장/수정
     */
    @PostMapping("/weight")
    public ResponseEntity<WeightResponse> saveWeight(
            @RequestBody WeightRequest request) {
        WeightResponse response = weightService.saveWeight(request);
        return ResponseEntity.ok(response);
    }
}
