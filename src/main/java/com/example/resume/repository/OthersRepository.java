package com.example.resume.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.example.resume.entity.Others;

public interface OthersRepository extends JpaRepository<Others, Long> {
    List<Others> findByUser_Id(Long userId);
}
