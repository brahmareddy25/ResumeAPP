package com.example.resume.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.resume.dto.UpdateUserDTO;
import com.example.resume.entity.User;
import com.example.resume.service.UserService;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    @Autowired
    private UserService service;

    // =================== Register ===================
    @PostMapping(value = "/register", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> registerUser(
            @RequestPart(value = "photo", required = false) MultipartFile photo,
            @RequestPart("name") String name,
            @RequestPart(value = "age", required = false) String ageStr,
            @RequestPart(value = "gender", required = false) String gender,
            @RequestPart(value = "address", required = false) String address,
            @RequestPart(value = "phoneNumber", required = false) String phoneNumber,
            @RequestPart("username") String username,
            @RequestPart("password") String password,
            @RequestPart(value = "email", required = false) String email,
            @RequestPart(value = "linkedin", required = false) String linkedin,
            @RequestPart(value = "github", required = false) String github
    ) {
        try {
            User user = new User();
            user.setName(name);
            if (ageStr != null && !ageStr.isBlank()) {
                try { user.setAge(Integer.parseInt(ageStr)); } catch (Exception ignored) {}
            }
            user.setGender(gender);
            user.setAddress(address);
            user.setPhoneNumber(phoneNumber);
            user.setUsername(username);
            user.setPassword(password);
            user.setEmail(email);
            user.setLinkedin(linkedin);
            user.setGithub(github);
            User saved = service.register(user, photo);
            saved.setPassword(null);
            saved.setPhoto(null);
            return ResponseEntity.status(HttpStatus.CREATED).body(saved);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
        }
    }

    // =================== Login ===================
    @PostMapping(value = "/login", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> loginRequest) {
        String username = loginRequest.get("username");
        String password = loginRequest.get("password");
        User loggedIn = service.login(username, password);
        if (loggedIn != null) return ResponseEntity.ok(loggedIn);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid username or password"));
    }

    // =================== Get by ID ===================
    @GetMapping("/{id}")
    public ResponseEntity<?> getUser(@PathVariable Long id) {
        User u = service.getUserById(id);
        if (u == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "User not found"));
        u.setPassword(null);
        return ResponseEntity.ok(u);
    }

    // =================== Edit Profile ===================
    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateUser(
            @PathVariable Long id,
            @RequestPart("name") String name,
            @RequestPart(value = "age", required = false) String ageStr,
            @RequestPart(value = "gender", required = false) String gender,
            @RequestPart(value = "address", required = false) String address,
            @RequestPart(value = "phoneNumber", required = false) String phoneNumber,
            @RequestPart(value = "email", required = false) String email,
            @RequestPart(value = "linkedin", required = false) String linkedin,
            @RequestPart(value = "github", required = false) String github,
            @RequestPart(value = "photo", required = false) MultipartFile photo
    ) {
    	UpdateUserDTO userUpdatedDto = new UpdateUserDTO();
    	userUpdatedDto.setAddress(address);
    	if (ageStr != null && !ageStr.isBlank()) {
            try { userUpdatedDto.setAge(Integer.parseInt(ageStr)); } catch (Exception ignored) {}
        }
    	userUpdatedDto.setEmail(email);
    	userUpdatedDto.setGender(gender);
    	userUpdatedDto.setGithub(github);
    	userUpdatedDto.setLinkedin(linkedin);
    	userUpdatedDto.setName(name);
    	userUpdatedDto.setPhoneNumber(phoneNumber);
    	
        try {
            User updatedUser = service.updateUser(id, userUpdatedDto, photo);
            if (updatedUser == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("error", "User not found"));
            }
            updatedUser.setPassword(null); // hide password
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    // =================== Reset Password ===================
    @PutMapping("/{id}/reset-password")
    @Operation(summary = "Change password for user")
    public ResponseEntity<?> resetPassword(@PathVariable Long id, @RequestBody Map<String, String> body) {
        String oldPassword = body.get("oldPassword");
        String newPassword = body.get("newPassword");
        String confirmPassword = body.get("confirmPassword");

        if (newPassword == null || !newPassword.equals(confirmPassword)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "Passwords do not match"));
        }

        boolean success = service.changePassword(id, oldPassword, newPassword);
        if (!success)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "Old password incorrect"));
        return ResponseEntity.ok(Map.of("message", "Password updated successfully"));
    }
}
