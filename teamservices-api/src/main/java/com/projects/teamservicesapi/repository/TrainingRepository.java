package com.projects.teamservicesapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projects.teamservicesapi.entity.Training;


@Repository
public interface TrainingRepository extends JpaRepository<Training, Integer>{


}
