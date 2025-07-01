package com.madridunited.backend.controllers;

import com.madridunited.backend.models.ContactMessage;
import com.madridunited.backend.services.ContactMessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
public class ContactMessageController {

    private final ContactMessageService service;

    @PostMapping
    public ResponseEntity<ContactMessage> submitMessage(@RequestBody ContactMessage message) {
        return ResponseEntity.ok(service.save(message));
    }
}
