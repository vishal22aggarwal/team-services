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

import com.projects.teamservicesapi.entity.Training;
import com.projects.teamservicesapi.service.TrainingService;

@CrossOrigin(origins = "http://localhost:4200/")
@RestController
@RequestMapping("/api/training")
public class TrainingController {
	@Autowired
	private TrainingService trainingService;
	
	@PostMapping
	public Training addTraining(@RequestBody Training training) {
		return trainingService.saveTraining(training);
	}
	
	@GetMapping
	public List<Training> getAllTraining() {
		return trainingService.getTrainings();
	}
	
	@GetMapping("/{id}") 
	public Training geTrainingById(@PathVariable int id) {
		return trainingService.getTrainingById(id);
	}
	
	@DeleteMapping("/{id}")
	public String deleteTrainingById(@PathVariable int id) {
		return trainingService.deleteTraining(id);
	}
	
	@PutMapping("/")
	public Training updateTraining(@RequestBody Training training) {
		return trainingService.updateTraining(training);
	}
}

