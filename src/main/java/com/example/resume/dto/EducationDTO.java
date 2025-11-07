package com.example.resume.dto;


public class EducationDTO {
    private String qualification;
    private String schoolOrCollege;
    private String stream;
    private String yearOfPassed;
    private String typeOfMarks;
    private Double marksObtained;

    // Getters and Setters
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
}

