package com.example.resume.service;

import java.util.List;
import org.springframework.web.multipart.MultipartFile;
import com.example.resume.entity.Others;

public interface OthersService {
    Others addOthers(Long userId, Others others, MultipartFile documentFile);
    List<Others> getAllOthers();
    Others getOthersById(Long id);
    List<Others> getOthersByUser(Long userId);
    Others updateOthers(Long id, String documentName, MultipartFile documentFile);
    void deleteOthers(Long id);
}
