package com.example.resume.service;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.resume.entity.Project;
import com.example.resume.entity.User;
import com.example.resume.repository.ProjectRepository;
import com.example.resume.repository.UserRepository;

@Service
public class ProjectServiceImpl implements ProjectService {

    @Autowired
    private ProjectRepository projectRepo;

    @Autowired
    private UserRepository userRepo;

    @Override
    public Project addProject(Long userId, Project project, MultipartFile document) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));

        project.setUser(user);

        if (document != null && !document.isEmpty()) {
            try {
                project.setDocument(document.getBytes());
            } catch (IOException e) {
                throw new RuntimeException("Error reading project document", e);
            }
        }

        return projectRepo.save(project);
    }

    @Override
    public Project updateProject(Long id, String projectTitle, String softwareUsed, String technologyUsed,
                                 String description, MultipartFile document) {

        Project existing = projectRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found with ID: " + id));

        if (projectTitle != null) existing.setProjectTitle(projectTitle);
        if (softwareUsed != null) existing.setSoftwareUsed(softwareUsed);
        if (technologyUsed != null) existing.setTechnologyUsed(technologyUsed);
        if (description != null) existing.setDescription(description);

        if (document != null && !document.isEmpty()) {
            try {
                existing.setDocument(document.getBytes());
            } catch (IOException e) {
                throw new RuntimeException("Error updating project document", e);
            }
        }

        return projectRepo.save(existing);
    }

    @Override
    public List<Project> getAllProjects() {
        return projectRepo.findAll();
    }

    @Override
    public Project getProjectById(Long id) {
        return projectRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found with ID: " + id));
    }

    @Override
    public List<Project> getProjectsByUser(Long userId) {
        return projectRepo.findByUser_Id(userId);
    }

    @Override
    public void deleteProject(Long id) {
        Project existing = projectRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found with ID: " + id));
        projectRepo.delete(existing);
    }
}
