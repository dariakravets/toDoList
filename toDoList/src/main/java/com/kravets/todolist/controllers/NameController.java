package com.kravets.todolist.controllers;

import com.kravets.todolist.Message;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class NameController {
    @GetMapping ("/message")
    public ResponseEntity getMes(@RequestParam("message") String message, @RequestParam("user") String user) {
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(new Message(user, message));
    }
}
