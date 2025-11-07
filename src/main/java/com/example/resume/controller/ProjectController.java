package com.example.resume.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.resume.entity.Project;
import com.example.resume.service.ProjectService;

@RestController
@RequestMapping("/api/project")
@CrossOrigin(origins = "http://localhost:4200")
public class ProjectController {

    @Autowired
    private ProjectService service;

    @PostMapping(value = "/add", consumes = "multipart/form-data")
    public ResponseEntity<Project> addProject(
            @RequestParam("user_id") Long userId,
            @RequestParam("projectTitle") String projectTitle,
            @RequestParam(value = "softwareUsed", required = false) String softwareUsed,
            @RequestParam(value = "technologyUsed", required = false) String technologyUsed,
            @RequestParam(value = "description", required = false) String description,
            @RequestPart(value = "document", required = false) MultipartFile document
    ) {
        Project project = new Project();
        project.setProjectTitle(projectTitle);
        project.setSoftwareUsed(softwareUsed);
        project.setTechnologyUsed(technologyUsed);
        project.setDescription(description);

        Project saved = service.addProject(userId, project, document);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping(value = "/update/{id}", consumes = "multipart/form-data")
    public ResponseEntity<Project> updateProject(
            @PathVariable Long id,
            @RequestParam(value = "projectTitle", required = false) String projectTitle,
            @RequestParam(value = "softwareUsed", required = false) String softwareUsed,
            @RequestParam(value = "technologyUsed", required = false) String technologyUsed,
            @RequestParam(value = "description", required = false) String description,
            @RequestPart(value = "document", required = false) MultipartFile document
    ) {
        Project updated = service.updateProject(id, projectTitle, softwareUsed, technologyUsed, description, document);
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Project>> getByUser(@PathVariable Long userId) {
        List<Project> list = service.getProjectsByUser(userId);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Project> getById(@PathVariable Long id) {
        Project project = service.getProjectById(id);
        return ResponseEntity.ok(project);
    }

    @GetMapping
    public ResponseEntity<List<Project>> getAll() {
        return ResponseEntity.ok(service.getAllProjects());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.deleteProject(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/document/{id}")
    public ResponseEntity<byte[]> getDocument(@PathVariable Long id) {
        Project project = service.getProjectById(id);
        byte[] document = project.getDocument();
        if (document == null) return ResponseEntity.noContent().build();
        return ResponseEntity.ok(document);
    }
}
