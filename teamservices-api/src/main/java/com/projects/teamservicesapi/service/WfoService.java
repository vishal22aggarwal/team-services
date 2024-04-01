package com.projects.teamservicesapi.service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.projects.teamservicesapi.entity.Wfo;

import com.projects.teamservicesapi.repository.WfoRepository;


@Service
public class WfoService {
	@Autowired
private WfoRepository wfoRepository;
	public Wfo saveWfo(Wfo wfo) {
		return wfoRepository.save(wfo);
	}
	public List<Wfo> saveWfo(List<Wfo> wfo) {
		return wfoRepository.saveAll(wfo);
	}
	
	public List<Wfo> getWfo() {
		return wfoRepository.findAll();
	}
	
	public Wfo getWfoById(int id) {
		return wfoRepository.findById(id).orElse(null);
	}
	public String deleteWfo(int id) {
		wfoRepository.deleteById(id);
		return "Employee deleted having id " + id;
	}
	public Wfo updateWfo(Wfo wfo) {
		Wfo existingWfo = wfoRepository.findById(wfo.getId()).orElse(null);
		existingWfo.setName(wfo.getName());
		existingWfo.setTO(wfo.getTO());
		existingWfo.setTH(wfo.getTH());
		existingWfo.setTL(wfo.getTL());
		existingWfo.setMonth(wfo.getMonth());
		
		return wfoRepository.save(existingWfo);
	}
	
}
