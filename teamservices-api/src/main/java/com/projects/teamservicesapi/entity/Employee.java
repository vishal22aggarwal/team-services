package com.projects.teamservicesapi.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Employee {
@Id
@GeneratedValue(strategy = GenerationType.AUTO)
private int id;
private int empId;
private String name;
private String grade;
private String designation;
private String project;
private String skills;
private String location;
private int contactNo;
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
public int getContactNo() {
	return contactNo;
}
public void setContactNo(int contactNo) {
	this.contactNo=contactNo;
}
}
