package com.madridunited.backend.services;

import com.madridunited.backend.models.ContactMessage;
import com.madridunited.backend.repositories.ContactMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ContactMessageService {

    private final ContactMessageRepository repository;

    public ContactMessage save(ContactMessage message) {
        return repository.save(message);
    }
}
