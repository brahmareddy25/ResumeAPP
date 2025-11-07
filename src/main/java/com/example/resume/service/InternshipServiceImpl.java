package com.example.resume.service;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.resume.entity.Internship;
import com.example.resume.entity.User;
import com.example.resume.repository.InternshipRepository;
import com.example.resume.repository.UserRepository;

@Service
public class InternshipServiceImpl implements InternshipService {

    @Autowired
    private InternshipRepository internshipRepo;

    @Autowired
    private UserRepository userRepo;

    @Override
    public Internship addInternship(Long userId, Internship internship, MultipartFile certificate) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));

        internship.setUser(user);

        if (certificate != null && !certificate.isEmpty()) {
            try {
                internship.setCertificate(certificate.getBytes());
            } catch (IOException e) {
                throw new RuntimeException("Error reading certificate file", e);
            }
        }

        return internshipRepo.save(internship);
    }

    @Override
    public List<Internship> getAllInternships() {
        return internshipRepo.findAll();
    }

    @Override
    public Internship getInternshipById(Long id) {
        return internshipRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Internship not found with ID: " + id));
    }

    @Override
    public List<Internship> getInternshipsByUser(Long userId) {
        return internshipRepo.findByUser_Id(userId);
    }

    @Override
    public Internship updateInternship(Long id, String companyName, String role, String startDate,
                                       String endDate, String description, MultipartFile certificate) {
        Internship existing = internshipRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Internship not found with ID: " + id));

        if (companyName != null) existing.setCompanyName(companyName);
        if (role != null) existing.setRole(role);
        if (startDate != null) existing.setStartDate(startDate);
        if (endDate != null) existing.setEndDate(endDate);
        if (description != null) existing.setDescription(description);

        if (certificate != null && !certificate.isEmpty()) {
            try {
                existing.setCertificate(certificate.getBytes());
            } catch (IOException e) {
                throw new RuntimeException("Error updating certificate file", e);
            }
        }

        return internshipRepo.save(existing);
    }

    @Override
    public void deleteInternship(Long id) {
        Internship existing = internshipRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Internship not found with ID: " + id));
        internshipRepo.delete(existing);
    }
}
