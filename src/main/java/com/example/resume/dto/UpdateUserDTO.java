package com.example.resume.dto;

public class UpdateUserDTO {

    private String name;
    private String email;
    private String phoneNumber;
    private String gender;
    private int age;
    private String address;
    private String linkedin;
    private String github;

    // Default constructor
    public UpdateUserDTO() {}

    // Constructor with all fields
    public UpdateUserDTO(String name, String email, String phoneNumber, String gender, int age,
                         String address, String linkedin, String github) {
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.gender = gender;
        this.age = age;
        this.address = address;
        this.linkedin = linkedin;
        this.github = github;
    }

    // Getters and Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public int getAge() { return age; }
    public void setAge(int ageStr) { this.age = ageStr; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getLinkedin() { return linkedin; }
    public void setLinkedin(String linkedin) { this.linkedin = linkedin; }

    public String getGithub() { return github; }
    public void setGithub(String github) { this.github = github; }
}
