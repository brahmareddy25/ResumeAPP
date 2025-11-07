package com.example.resume.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name = "users", uniqueConstraints = {@UniqueConstraint(columnNames = {"username"})})
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String name;

    private int age;

    private String gender;

    private String address;

    @Column(name = "phone_number")
    private String phoneNumber;

    @NotBlank
    @Column(nullable = false, unique = true)
    private String username;

    @NotBlank
    private String password;

    @Email
    private String email;

    private String linkedin;

    private String github;

    @Lob
    @Basic(fetch = FetchType.LAZY)
    private byte[] photo;

    public User() {}

    public User(Long id, String name, int age, String gender, String address, String phoneNumber,
                String username, String password, String email, String linkedin, String github, byte[] photo) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.username = username;
        this.password = password;
        this.email = email;
        this.linkedin = linkedin;
        this.github = github;
        this.photo = photo;
    }

    // Getters & setters (manual)
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getLinkedin() { return linkedin; }
    public void setLinkedin(String linkedin) { this.linkedin = linkedin; }

    public String getGithub() { return github; }
    public void setGithub(String github) { this.github = github; }

    public byte[] getPhoto() { return photo; }
    public void setPhoto(byte[] photo) { this.photo = photo; }
}
