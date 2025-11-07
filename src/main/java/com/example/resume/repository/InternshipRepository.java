package com.example.resume.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.resume.entity.Internship;

public interface InternshipRepository extends JpaRepository<Internship, Long> {
    List<Internship> findByUser_Id(Long userId);
}
