package com.example.resume.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;
import com.example.resume.entity.Education;

public interface EducationService {

    Education addEducation(Long userId, Education education, MultipartFile certificate);
    List<Education> getAllEducations();
    Education getEducationById(Long id);
    List<Education> getEducationsByUser(Long userId);
    Education updateEducation(Long id, String qualification, String schoolOrCollege, 
                              String stream, String yearOfPassed, String typeOfMarks,
                              Double marksObtained, MultipartFile certificate);
    void deleteEducation(Long id);
}
