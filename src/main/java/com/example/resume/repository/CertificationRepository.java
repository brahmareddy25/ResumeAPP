package com.example.resume.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.resume.entity.Certification;

public interface CertificationRepository extends JpaRepository<Certification, Long> {
    List<Certification> findByUser_Id(Long userId);
}
