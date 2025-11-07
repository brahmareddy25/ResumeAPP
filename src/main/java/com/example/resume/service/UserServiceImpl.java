package com.example.resume.service;

import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.resume.dto.UpdateUserDTO;
import com.example.resume.entity.User;
import com.example.resume.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository repo;

    @Override
    public User register(User user, MultipartFile photo) throws IOException {
        if (repo.existsByUsername(user.getUsername()))
            throw new IllegalArgumentException("Username already exists");

        if (photo != null && !photo.isEmpty())
            user.setPhoto(photo.getBytes());

        return repo.save(user);
    }

    @Override
    public User login(String username, String password) {
        User u = repo.findByUsername(username);
        if (u != null && u.getPassword().equals(password)) {
            u.setPassword(null);
            return u;
        }
        return null;
    }

    @Override
    public List<User> getAllUsers() {
        return repo.findAll();
    }

    @Override
    public User getUserById(Long id) {
        return repo.findById(id).orElse(null);
    }

    // =================== Update profile ===================
    @Override
    public User updateUser(Long id, UpdateUserDTO dto, MultipartFile photo) {
        Optional<User> optionalUser = repo.findById(id);
        if (optionalUser.isEmpty()) {
            return null; // user not found
        }

        User user = optionalUser.get();
        user.setAddress(dto.getAddress());
        user.setAge(dto.getAge());
        user.setEmail(dto.getEmail());
        user.setGender(dto.getGender());
        user.setGithub(dto.getGithub());
        user.setName(dto.getName());
        user.setLinkedin(dto.getLinkedin());
        // Update photo if present
        if (photo != null && !photo.isEmpty()) {
            try {
                user.setPhoto(photo.getBytes());
            } catch (IOException e) {
                throw new RuntimeException("Failed to upload photo", e);
            }
        }

        return repo.save(user);
    }

    // =================== Change Password ===================
    @Override
    public boolean changePassword(Long id, String oldPassword, String newPassword) {
        User u = repo.findById(id).orElse(null);
        if (u == null) return false;
        if (!u.getPassword().equals(oldPassword)) return false;
        u.setPassword(newPassword);
        repo.save(u);
        return true;
    }
}
