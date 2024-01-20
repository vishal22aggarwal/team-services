package com.projects.teamservicesapi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projects.teamservicesapi.entity.User;
import com.projects.teamservicesapi.repository.UserRepository;

@Service
public class UserService {
	@Autowired
	private  UserRepository userRepository;
	
	public User saveUser(User user) {
		return userRepository.save(user);
	}
	
	public List<User> saveUsers(List<User> users) {
		return userRepository.saveAll(users);
	}
	
	public List<User> getUsers() {
		return userRepository.findAll();
	}
	
	public User getUserById(int id) {
		return userRepository.findById(id).orElse(null);
	}
	
	public String deleteUser(int id) {
		userRepository.deleteById(id);
		return "User deleted having id " + id;
	}
	
	public User updateUser(User user) {
		User existingUser = userRepository.findById(user.getId()).orElse(null);
		existingUser.setEmail(user.getEmail());
		existingUser.setEmpId(user.getEmpId());
		existingUser.setName(user.getName());
		existingUser.setPassword(user.getPassword());
		existingUser.setRole(user.getRole());
		
		return userRepository.save(existingUser);
	}
}
