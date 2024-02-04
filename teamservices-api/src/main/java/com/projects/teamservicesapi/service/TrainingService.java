package com.projects.teamservicesapi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projects.teamservicesapi.entity.Training;
import com.projects.teamservicesapi.repository.TrainingRepository;

@Service
public class TrainingService {
	@Autowired
	private  TrainingRepository trainingRepository;
	
	public Training saveTraining(Training training) {
		return trainingRepository.save(training);
	}
	
	public List<Training> saveTrainings(List<Training> trainings) {
		return trainingRepository.saveAll(trainings);
	}
	
	public List<Training> getTrainings() {
		return trainingRepository.findAll();
	}
	
	public Training getTrainingById(int id) {
		return trainingRepository.findById(id).orElse(null);
	}
	
	public String deleteTraining(int id) {
		trainingRepository.deleteById(id);
		return "Training deleted having id " + id;
	}
	
	public Training updateTraining(Training training) {
		Training existingTraining = trainingRepository.findById(training.getId()).orElse(null);
		existingTraining.setTrainingTitle(training.getTrainingTitle());
		existingTraining.setTrainingType(training.getTrainingType());
		existingTraining.setPlannedDate(training.getPlannedDate());
		existingTraining.setStartDate(training.getStartDate());
		existingTraining.setEndDate(training.getEndDate());
		existingTraining.setName(training.getName());
		existingTraining.setStatus(training.getStatus());
		existingTraining.setReference(training.getReference());
		existingTraining.setMode(training.getMode());
		return trainingRepository.save(existingTraining);
	}
}
