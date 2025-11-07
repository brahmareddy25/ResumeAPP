package com.example.resume.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.resume.entity.Internship;
import com.example.resume.service.InternshipService;

@RestController
@RequestMapping("/api/internship")
@CrossOrigin(origins = "http://localhost:4200")
public class InternshipController {

    @Autowired
    private InternshipService service;

    @PostMapping(value = "/add", consumes = "multipart/form-data")
    public ResponseEntity<Internship> addInternship(
            @RequestParam("user_id") Long userId,
            @RequestParam("companyName") String companyName,
            @RequestParam("role") String role,
            @RequestParam(value = "startDate", required = false) String startDate,
            @RequestParam(value = "endDate", required = false) String endDate,
            @RequestParam(value = "description", required = false) String description,
            @RequestPart(value = "certificate", required = false) MultipartFile certificate
    ) {
        Internship internship = new Internship();
        internship.setCompanyName(companyName);
        internship.setRole(role);
        internship.setStartDate(startDate);
        internship.setEndDate(endDate);
        internship.setDescription(description);

        Internship saved = service.addInternship(userId, internship, certificate);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping(value = "/update/{id}", consumes = "multipart/form-data")
    public ResponseEntity<Internship> updateInternship(
            @PathVariable Long id,
            @RequestParam(value = "companyName", required = false) String companyName,
            @RequestParam(value = "role", required = false) String role,
            @RequestParam(value = "startDate", required = false) String startDate,
            @RequestParam(value = "endDate", required = false) String endDate,
            @RequestParam(value = "description", required = false) String description,
            @RequestPart(value = "certificate", required = false) MultipartFile certificate
    ) {
        Internship updated = service.updateInternship(id, companyName, role, startDate, endDate, description, certificate);
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Internship>> getByUser(@PathVariable Long userId) {
        List<Internship> list = service.getInternshipsByUser(userId);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Internship> getById(@PathVariable Long id) {
        Internship internship = service.getInternshipById(id);
        return ResponseEntity.ok(internship);
    }

    @GetMapping
    public ResponseEntity<List<Internship>> getAll() {
        return ResponseEntity.ok(service.getAllInternships());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.deleteInternship(id);
        return ResponseEntity.noContent().build();
    }
}
