package com.kravets.todolist.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class PremiumController {
    private static final String PREMIUM_CODE = "krv_bw9v3737wv3ed4fd5cwf3973";

    @GetMapping ("/premiumCode")
    public ResponseEntity getPremium(@RequestParam("code") String code) {
        if (code.equals(PREMIUM_CODE)){
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(true);
        }
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(false);
    }
}

