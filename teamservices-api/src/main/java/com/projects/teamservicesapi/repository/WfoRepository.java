package com.projects.teamservicesapi.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projects.teamservicesapi.entity.Wfo;

@Repository
public interface WfoRepository extends JpaRepository <Wfo,Integer>{

}
