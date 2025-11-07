package com.example.resume.entity;

import jakarta.persistence.*;

@Entity
public class Certification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long certificationId;

    private String certificateName;
    private String dateOfGot;

    @Lob
    private byte[] certificateFile;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    // Getters and Setters
    public Long getCertificationId() {
        return certificationId;
    }

    public void setCertificationId(Long certificationId) {
        this.certificationId = certificationId;
    }

    public String getCertificateName() {
        return certificateName;
    }

    public void setCertificateName(String certificateName) {
        this.certificateName = certificateName;
    }

    public String getDateOfGot() {
        return dateOfGot;
    }

    public void setDateOfGot(String dateOfGot) {
        this.dateOfGot = dateOfGot;
    }

    public byte[] getCertificateFile() {
        return certificateFile;
    }

    public void setCertificateFile(byte[] certificateFile) {
        this.certificateFile = certificateFile;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
