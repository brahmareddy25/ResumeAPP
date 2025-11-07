package com.example.resume.service;

import java.io.IOException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.example.resume.entity.Others;
import com.example.resume.entity.User;
import com.example.resume.repository.OthersRepository;
import com.example.resume.repository.UserRepository;

@Service
public class OthersServiceImpl implements OthersService {

    @Autowired
    private OthersRepository othersRepo;

    @Autowired
    private UserRepository userRepo;

    @Override
    public Others addOthers(Long userId, Others others, MultipartFile documentFile) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));

        others.setUser(user);

        if (documentFile != null && !documentFile.isEmpty()) {
            try {
                others.setDocumentFile(documentFile.getBytes());
            } catch (IOException e) {
                throw new RuntimeException("Error while reading document file", e);
            }
        }

        return othersRepo.save(others);
    }

    @Override
    public List<Others> getAllOthers() {
        return othersRepo.findAll();
    }

    @Override
    public Others getOthersById(Long id) {
        return othersRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Others not found with ID: " + id));
    }

    @Override
    public List<Others> getOthersByUser(Long userId) {
        return othersRepo.findByUser_Id(userId);
    }

    @Override
    public Others updateOthers(Long id, String documentName, MultipartFile documentFile) {
        Others existing = othersRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Others not found with ID: " + id));

        if (documentName != null) existing.setDocumentName(documentName);

        if (documentFile != null && !documentFile.isEmpty()) {
            try {
                existing.setDocumentFile(documentFile.getBytes());
            } catch (IOException e) {
                throw new RuntimeException("Error updating document file", e);
            }
        }

        return othersRepo.save(existing);
    }

    @Override
    public void deleteOthers(Long id) {
        Others existing = othersRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Others not found with ID: " + id));
        othersRepo.delete(existing);
    }
}
