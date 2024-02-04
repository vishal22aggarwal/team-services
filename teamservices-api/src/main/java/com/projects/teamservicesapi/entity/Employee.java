package com.projects.teamservicesapi.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Employee {
@Id
@GeneratedValue(strategy = GenerationType.AUTO)

private int id;
@JsonProperty("EmpId")
private int empId;

@JsonProperty("Name")
private String name;

@JsonProperty("Grade")
private String grade;

@JsonProperty("Designation")
private String designation;

@JsonProperty("Project")
private String project;

@JsonProperty("Skills")
private String skills;

@JsonProperty("Location")
private String location;

@JsonProperty("ContactNo")
private String contactNo;

public int getId() {
	return id;
}
public void setId(int id) {
	this.id = id;
}
public int getEmpId() {
	return empId;
}
public void setEmpId(int empId) {
	this.empId = empId;
}
public String getName() {
	return name;
}
public void setName(String name) {
	this.name = name;
}
public String getGrade() {
	return grade;
}
public void setGrade(String grade) {
	this.grade=grade;
}
public String getDesignation() {
	return designation;
}
public void setDesignation(String designation) {
	this.designation=designation;
}
public String getProject() {
	return project;
}
public void setProject(String project) {
	this.project=project;
}
public String getSkills() {
	return skills;
}
public void setSkills(String skills) {
	this.skills=skills;
}
public String getLocation() {
	return location;
}
public void setLocation(String location) {
	this.location=location;
}
public String getContactNo() {
	return contactNo;
}
public void setContactNo(String contactNo) {
	this.contactNo=contactNo;
}
}
