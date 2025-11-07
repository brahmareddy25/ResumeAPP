package com.example.resume.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.resume.entity.Certification;
import com.example.resume.service.CertificationService;

@RestController
@RequestMapping("/api/certification")
@CrossOrigin(origins = "http://localhost:4200")
public class CertificationController {

    @Autowired
    private CertificationService service;

    @PostMapping(value = "/add", consumes = "multipart/form-data")
    public ResponseEntity<Certification> addCertification(
            @RequestParam("user_id") Long userId,
            @RequestParam("certificateName") String certificateName,
            @RequestParam("dateOfGot") String dateOfGot,
            @RequestPart(value = "certificateFile", required = false) MultipartFile certificateFile
    ) {
        Certification cert = new Certification();
        cert.setCertificateName(certificateName);
        cert.setDateOfGot(dateOfGot);

        Certification saved = service.addCertification(userId, cert, certificateFile);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping(value = "/update/{id}", consumes = "multipart/form-data")
    public ResponseEntity<Certification> updateCertification(
            @PathVariable Long id,
            @RequestParam(value = "certificateName", required = false) String certificateName,
            @RequestParam(value = "dateOfGot", required = false) String dateOfGot,
            @RequestPart(value = "certificateFile", required = false) MultipartFile certificateFile
    ) {
        Certification updated = service.updateCertification(id, certificateName, dateOfGot, certificateFile);
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Certification>> getByUser(@PathVariable Long userId) {
        List<Certification> list = service.getCertificationsByUser(userId);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Certification> getById(@PathVariable Long id) {
        Certification cert = service.getCertificationById(id);
        return ResponseEntity.ok(cert);
    }

    @GetMapping
    public ResponseEntity<List<Certification>> getAll() {
        return ResponseEntity.ok(service.getAllCertifications());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.deleteCertification(id);
        return ResponseEntity.noContent().build();
    }
}
