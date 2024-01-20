package com.projects.teamservicesapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projects.teamservicesapi.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer>{

}
