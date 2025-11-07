package com.example.resume.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.resume.entity.Education;
@Repository
public interface EducationRepository extends JpaRepository<Education, Long> {
    List<Education> findByUser_Id(Long userId); // ✅ if your User entity uses 'id'
}
