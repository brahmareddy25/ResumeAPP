package com.example.resume.service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.resume.entity.Education;
import com.example.resume.entity.User;
import com.example.resume.repository.EducationRepository;
import com.example.resume.repository.UserRepository;

@Service
public class EducationServiceImpl implements EducationService {

    @Autowired
    private EducationRepository educationRepo;

    @Autowired
    private UserRepository userRepo;

    @Override
    public Education addEducation(Long userId, Education education, MultipartFile certificate) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));

        education.setUser(user);

        if (certificate != null && !certificate.isEmpty()) {
            try {
                education.setCertificate(certificate.getBytes());
            } catch (IOException e) {
                throw new RuntimeException("Error while reading certificate file", e);
            }
        }

        return educationRepo.save(education);
    }

    @Override
    public List<Education> getAllEducations() {
        return educationRepo.findAll();
    }

    @Override
    public Education getEducationById(Long id) {
        return educationRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Education not found with ID: " + id));
    }

    @Override
    public List<Education> getEducationsByUser(Long userId) {
        return educationRepo.findByUser_Id(userId);
    }

    @Override
    public Education updateEducation(Long id, String qualification, String schoolOrCollege,
                                     String stream, String yearOfPassed, String typeOfMarks,
                                     Double marksObtained, MultipartFile certificate) {

        Education existing = educationRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Education not found with ID: " + id));

        if (qualification != null) existing.setQualification(qualification);
        if (schoolOrCollege != null) existing.setSchoolOrCollege(schoolOrCollege);
        if (stream != null) existing.setStream(stream);
        if (yearOfPassed != null) existing.setYearOfPassed(yearOfPassed);
        if (typeOfMarks != null) existing.setTypeOfMarks(typeOfMarks);
        if (marksObtained != null) existing.setMarksObtained(marksObtained);

        if (certificate != null && !certificate.isEmpty()) {
            try {
                existing.setCertificate(certificate.getBytes());
            } catch (IOException e) {
                throw new RuntimeException("Error updating certificate file", e);
            }
        }

        return educationRepo.save(existing);
    }

    @Override
    public void deleteEducation(Long id) {
        Education existing = educationRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Education not found with ID: " + id));
        educationRepo.delete(existing);
    }
}
