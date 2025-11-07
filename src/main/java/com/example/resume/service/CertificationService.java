package com.example.resume.service;

import java.util.List;
import org.springframework.web.multipart.MultipartFile;
import com.example.resume.entity.Certification;

public interface CertificationService {
    Certification addCertification(Long userId, Certification certification, MultipartFile certificateFile);
    Certification updateCertification(Long id, String certificateName, String dateOfGot, MultipartFile certificateFile);
    void deleteCertification(Long id);
    Certification getCertificationById(Long id);
    List<Certification> getAllCertifications();
    List<Certification> getCertificationsByUser(Long userId);
}
