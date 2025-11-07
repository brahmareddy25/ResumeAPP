package com.example.resume.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.resume.entity.Education;
import com.example.resume.service.EducationService;

@RestController
@RequestMapping("/api/education")
@CrossOrigin(origins = "http://localhost:4200")
public class EducationController {

    @Autowired
    private EducationService service;

    // CREATE
    @PostMapping(value = "/add", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Education> addEducation(
            @RequestParam("user_id") Long userId,
            @RequestParam("qualification") String qualification,
            @RequestParam("schoolOrCollege") String schoolOrCollege,
            @RequestParam(value = "stream", required = false) String stream,
            @RequestParam(value = "yearOfPassed", required = false) String yearOfPassed,
            @RequestParam(value = "typeOfMarks", required = false) String typeOfMarks,
            @RequestParam(value = "marksObtained", required = false) Double marksObtained,
            @RequestPart(value = "certificate", required = false) MultipartFile certificate
    ) {
        System.out.println("Hiii"); // will now execute if request is proper

        Education edu = new Education();
        edu.setQualification(qualification);
        edu.setSchoolOrCollege(schoolOrCollege);
        edu.setStream(stream);
        edu.setYearOfPassed(yearOfPassed);
        edu.setTypeOfMarks(typeOfMarks);
        edu.setMarksObtained(marksObtained);

        Education saved = service.addEducation(userId, edu, certificate);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }


    // READ ALL
    @GetMapping("/all")
    public ResponseEntity<List<Education>> getAllEducations() {
        return ResponseEntity.ok(service.getAllEducations());
    }

    // READ BY ID
    @GetMapping("/{id}")
    public ResponseEntity<Education> getEducationById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getEducationById(id));
    }

    // READ BY USER
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Education>> getEducationsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getEducationsByUser(userId));
    }

    // UPDATE
    @PutMapping(value = "/update/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Education> updateEducation(
            @PathVariable Long id,
            @RequestParam(value = "qualification", required = false) String qualification,
            @RequestParam(value = "schoolOrCollege", required = false) String schoolOrCollege,
            @RequestParam(value = "stream", required = false) String stream,
            @RequestParam(value = "yearOfPassed", required = false) String yearOfPassed,
            @RequestParam(value = "typeOfMarks", required = false) String typeOfMarks,
            @RequestParam(value = "marksObtained", required = false) Double marksObtained,
            @RequestPart(value = "certificate", required = false) MultipartFile certificate
    ) {
        System.out.println("Updating Education ID: " + id); // will now execute if request is proper

        Education updated = service.updateEducation(id, qualification, schoolOrCollege, stream,
                yearOfPassed, typeOfMarks, marksObtained, certificate);
        return ResponseEntity.ok(updated);
    }


    // DELETE
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteEducation(@PathVariable Long id) {
        service.deleteEducation(id);
        return ResponseEntity.ok("Education record deleted successfully.");
    }
}
