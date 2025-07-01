package com.madridunited.backend.controllers;

import com.madridunited.backend.models.News;
import com.madridunited.backend.services.NewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/news")
@CrossOrigin(origins = "*")
public class NewController {

    private final NewService newService;

    @Autowired
    public NewController(NewService newService) {
        this.newService = newService;
    }

    @GetMapping
    public List<News> getAllNews() {
        return newService.getAllNews();
    }

    @GetMapping("/{id}")
    public ResponseEntity<News> getNewsById(@PathVariable Long id) {
        return newService.getNewsById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<News> createNews(@RequestBody News news) {
        return ResponseEntity.ok(newService.createNews(news));
    }

    @PutMapping("/{id}")
    public ResponseEntity<News> updateNews(@PathVariable Long id, @RequestBody News news) {
        try {
            return ResponseEntity.ok(newService.updateNews(id, news));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNews(@PathVariable Long id) {
        try {
            newService.deleteNews(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
