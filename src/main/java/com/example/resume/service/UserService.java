package com.example.resume.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.example.resume.dto.UpdateUserDTO;
import com.example.resume.entity.User;

public interface UserService {
    User register(User user, MultipartFile photo) throws IOException;
    User login(String username, String password);
    List<User> getAllUsers();
    User getUserById(Long id);

    // new methods
    User updateUser(Long id, UpdateUserDTO dto, MultipartFile photo);
    boolean changePassword(Long id, String oldPassword, String newPassword);
}
