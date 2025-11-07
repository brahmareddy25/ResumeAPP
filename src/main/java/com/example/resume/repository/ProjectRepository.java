package com.example.resume.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.resume.entity.Project;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByUser_Id(Long userId);
}
