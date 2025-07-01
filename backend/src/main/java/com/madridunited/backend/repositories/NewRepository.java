package com.madridunited.backend.repositories;

import com.madridunited.backend.models.News;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NewRepository extends JpaRepository<News,Long> {

}
