package com.example.resume.service;

import java.io.IOException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.example.resume.entity.Certification;
import com.example.resume.entity.User;
import com.example.resume.repository.CertificationRepository;
import com.example.resume.repository.UserRepository;

@Service
public class CertificationServiceImpl implements CertificationService {

    @Autowired
    private CertificationRepository certificationRepo;

    @Autowired
    private UserRepository userRepo;

    @Override
    public Certification addCertification(Long userId, Certification certification, MultipartFile certificateFile) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));

        certification.setUser(user);

        if (certificateFile != null && !certificateFile.isEmpty()) {
            try {
                certification.setCertificateFile(certificateFile.getBytes());
            } catch (IOException e) {
                throw new RuntimeException("Error reading certificate file", e);
            }
        }

        return certificationRepo.save(certification);
    }

    @Override
    public Certification updateCertification(Long id, String certificateName, String dateOfGot, MultipartFile certificateFile) {
        Certification existing = certificationRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Certification not found with ID: " + id));

        if (certificateName != null) existing.setCertificateName(certificateName);
        if (dateOfGot != null) existing.setDateOfGot(dateOfGot);

        if (certificateFile != null && !certificateFile.isEmpty()) {
            try {
                existing.setCertificateFile(certificateFile.getBytes());
            } catch (IOException e) {
                throw new RuntimeException("Error updating certificate file", e);
            }
        }

        return certificationRepo.save(existing);
    }

    @Override
    public void deleteCertification(Long id) {
        Certification existing = certificationRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Certification not found with ID: " + id));
        certificationRepo.delete(existing);
    }

    @Override
    public Certification getCertificationById(Long id) {
        return certificationRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Certification not found with ID: " + id));
    }

    @Override
    public List<Certification> getAllCertifications() {
        return certificationRepo.findAll();
    }

    @Override
    public List<Certification> getCertificationsByUser(Long userId) {
        return certificationRepo.findByUser_Id(userId);
    }
}
