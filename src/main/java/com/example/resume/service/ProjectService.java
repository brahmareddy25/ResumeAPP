package com.example.resume.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.example.resume.entity.Project;

public interface ProjectService {

    Project addProject(Long userId, Project project, MultipartFile document);

    Project updateProject(Long id, String projectTitle, String softwareUsed, String technologyUsed,
                          String description, MultipartFile document);

    List<Project> getAllProjects();

    Project getProjectById(Long id);

    List<Project> getProjectsByUser(Long userId);

    void deleteProject(Long id);
}
