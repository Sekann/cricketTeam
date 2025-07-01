package com.madridunited.backend.services;

import com.madridunited.backend.models.News;
import com.madridunited.backend.repositories.NewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NewService {

    private final NewRepository newRepository;

    @Autowired
    public NewService(NewRepository newsRepository) {
        this.newRepository = newsRepository;
    }

    public List<News> getAllNews() {
        return newRepository.findAll();
    }

    public Optional<News> getNewsById(Long id) {
        return newRepository.findById(id);
    }

    public News createNews(News news) {
        return newRepository.save(news);
    }

    public News updateNews(Long id, News updatedNews) {
        return newRepository.findById(id)
                .map(news -> {
                    news.setTitle(updatedNews.getTitle());
                    news.setContent(updatedNews.getContent());
                    news.setImageUrl(updatedNews.getImageUrl());
                    return newRepository.save(news);
                })
                .orElseThrow(() -> new RuntimeException("News not found with id " + id));
    }

    public void deleteNews(Long id) {
        if (!newRepository.existsById(id)) {
            throw new RuntimeException("News not found with id " + id);
        }
        newRepository.deleteById(id);
    }
}
