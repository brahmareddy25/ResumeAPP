package com.example.resume.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.example.resume.entity.Others;
import com.example.resume.service.OthersService;

@RestController
@RequestMapping("/api/others")
@CrossOrigin(origins = "http://localhost:4200")
public class OthersController {

    @Autowired
    private OthersService service;

    @PostMapping(value = "/add", consumes = "multipart/form-data")
    public ResponseEntity<Others> addOthers(
            @RequestParam("user_id") Long userId,
            @RequestParam("documentName") String documentName,
            @RequestPart(value = "documentFile", required = false) MultipartFile documentFile
    ) {
        Others others = new Others();
        others.setDocumentName(documentName);
        Others saved = service.addOthers(userId, others, documentFile);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping(value = "/update/{id}", consumes = "multipart/form-data")
    public ResponseEntity<Others> updateOthers(
            @PathVariable Long id,
            @RequestParam(value = "documentName", required = false) String documentName,
            @RequestPart(value = "documentFile", required = false) MultipartFile documentFile
    ) {
        Others updated = service.updateOthers(id, documentName, documentFile);
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Others>> getByUser(@PathVariable Long userId) {
        List<Others> list = service.getOthersByUser(userId);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Others> getById(@PathVariable Long id) {
        Others others = service.getOthersById(id);
        return ResponseEntity.ok(others);
    }

    @GetMapping
    public ResponseEntity<List<Others>> getAll() {
        return ResponseEntity.ok(service.getAllOthers());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.deleteOthers(id);
        return ResponseEntity.noContent().build();
    }
}
