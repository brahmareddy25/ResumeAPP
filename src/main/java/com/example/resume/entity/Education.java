package com.example.resume.entity;


import jakarta.persistence.*;

@Entity
@Table(name = "education")
public class Education {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long educationId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user; // assuming User entity exists

    @Column(nullable = false)
    private String qualification;

    @Column(nullable = false)
    private String schoolOrCollege;

    private String stream;
    private String yearOfPassed;
    private String typeOfMarks;
    private Double marksObtained;

    @Lob
    @Basic(fetch = FetchType.LAZY)
    private byte[] certificate;
    public Education()
    {}

    // Getters and Setters
    public Long getEducationId() { return educationId; }
    public void setEducationId(Long educationId) { this.educationId = educationId; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getQualification() { return qualification; }
    public void setQualification(String qualification) { this.qualification = qualification; }

    public String getSchoolOrCollege() { return schoolOrCollege; }
    public void setSchoolOrCollege(String schoolOrCollege) { this.schoolOrCollege = schoolOrCollege; }

    public String getStream() { return stream; }
    public void setStream(String stream) { this.stream = stream; }

    public String getYearOfPassed() { return yearOfPassed; }
    public void setYearOfPassed(String yearOfPassed) { this.yearOfPassed = yearOfPassed; }

    public String getTypeOfMarks() { return typeOfMarks; }
    public void setTypeOfMarks(String typeOfMarks) { this.typeOfMarks = typeOfMarks; }

    public Double getMarksObtained() { return marksObtained; }
    public void setMarksObtained(Double marksObtained) { this.marksObtained = marksObtained; }

    public byte[] getCertificate() { return certificate; }
    public void setCertificate(byte[] certificate) { this.certificate = certificate; }
}
