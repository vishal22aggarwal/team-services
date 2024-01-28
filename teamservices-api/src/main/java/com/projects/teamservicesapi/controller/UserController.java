package com.projects.teamservicesapi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projects.teamservicesapi.entity.User;
import com.projects.teamservicesapi.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

	@Autowired
	private UserService userService;
	
	@PostMapping("/")
	public User addUser(@RequestBody User user) {
		return userService.saveUser(user);
	}
	@CrossOrigin(origins = "http://localhost:4200/")
	@GetMapping
	public List<User> getAllUsers() {
		return userService.getUsers();
	}
	
	@GetMapping("/{id}") 
	public User getUserById(@PathVariable int id) {
		return userService.getUserById(id);
	}
	
	@DeleteMapping("/{id}")
	public String deleteUserById(@PathVariable int id) {
		return userService.deleteUser(id);
	}
	
	@PutMapping("/")
	public User updateUser(@RequestBody User user) {
		return userService.updateUser(user);
	}
}
