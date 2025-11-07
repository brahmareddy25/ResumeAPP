package com.example.resume.service;

import java.util.List;
import org.springframework.web.multipart.MultipartFile;
import com.example.resume.entity.Internship;

public interface InternshipService {

    Internship addInternship(Long userId, Internship internship, MultipartFile certificate);

    List<Internship> getAllInternships();

    Internship getInternshipById(Long id);

    List<Internship> getInternshipsByUser(Long userId);

    Internship updateInternship(Long id, String companyName, String role, String startDate,
                                String endDate, String description, MultipartFile certificate);

    void deleteInternship(Long id);
}
