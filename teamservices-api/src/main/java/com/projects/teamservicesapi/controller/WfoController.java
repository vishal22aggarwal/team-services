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


import com.projects.teamservicesapi.entity.Wfo;

import com.projects.teamservicesapi.service.WfoService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/wfo")
public class WfoController {
	@Autowired
	private WfoService wfoService;
	
	@PostMapping
	public Wfo addWfo(@RequestBody Wfo wfo) {
		return wfoService.saveWfo(wfo);
	}
	
	@GetMapping
	public List<Wfo> getAllWfo() {
		return wfoService.getWfo();
	}
	
	@GetMapping("/{id}") 
	public Wfo getWfoById(@PathVariable int id) {
		return wfoService.getWfoById(id);
	}
	
	@DeleteMapping("/{id}")
	public String deleteWfoById(@PathVariable int id) {
		return wfoService.deleteWfo(id);
	}
	
	@PutMapping("/")
	public Wfo updateWfo(@RequestBody Wfo wfo) {
		return wfoService.updateWfo(wfo);
	}
}
