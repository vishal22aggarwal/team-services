package com.projects.teamservicesapi.service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projects.teamservicesapi.entity.Employee;

import com.projects.teamservicesapi.repository.EmployeeRepository;


@Service
public class EmployeeService {
	@Autowired
private  EmployeeRepository employeeRepository;
	
	public Employee saveEmployee(Employee employee) {
		return employeeRepository.save(employee);
	}
	public List<Employee> saveEmployee(List<Employee> employee) {
		return employeeRepository.saveAll(employee);
	}
	
	public List<Employee> getEmployee() {
		return employeeRepository.findAll();
	}
	
	public Employee getEmployeeById(int id) {
		return employeeRepository.findById(id).orElse(null);
	}
	
	public String deleteEmployee(int id) {
		employeeRepository.deleteById(id);
		return "Employee deleted having id " + id;
	}
	public Employee updateEmployee(Employee employee) {
		Employee existingEmployee = employeeRepository.findById(employee.getId()).orElse(null);
		existingEmployee.setContactNo(employee.getContactNo());
		existingEmployee.setEmpId(employee.getEmpId());
		existingEmployee.setName(employee.getName());
		existingEmployee.setLocation(employee.getLocation());
		existingEmployee.setDesignation(employee.getDesignation());
		existingEmployee.setSkills(employee.getSkills());
		existingEmployee.setGrade(employee.getGrade());
		existingEmployee.setProject(employee.getProject());
		return employeeRepository.save(existingEmployee);
	}
}
