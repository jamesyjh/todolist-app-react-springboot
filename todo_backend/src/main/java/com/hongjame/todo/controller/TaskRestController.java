package com.hongjame.todo.controller;


import java.net.URI;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.hongjame.todo.model.Task;
import com.hongjame.todo.service.TaskService;

@CrossOrigin(origins = { "http://localhost:3000", "https://jamesyjh.github.io" })
@RestController
public class TaskRestController {
	
  @Autowired
  private TaskService service;
  
  @GetMapping("/users/{username}/tasks")
  public List<Task> getAllTasks(@PathVariable String username) {
	  System.out.println(username);
    return service.findAll();
  }
  
  @GetMapping("/users/{username}/tasks/{id}")
  public Task getTask(@PathVariable String username, @PathVariable long id) {
    return service.findById(id);
  }
  
  @DeleteMapping("/users/{username}/tasks/{id}")
  public ResponseEntity<Void> deleteTask(@PathVariable String username, @PathVariable long id) {
	  Task task = service.deleteById(id);
    if (task != null) {
      return ResponseEntity.noContent().build();
    }
    return ResponseEntity.notFound().build();
  }
  
  @PutMapping("/users/{username}/tasks/{id}")
  public ResponseEntity<Task> updateTask(@PathVariable String username, @PathVariable long id,
      @RequestBody Task task) {
	task.setUsername(username);
	Task taskUpdated = service.save(task);
    return new ResponseEntity<Task>(taskUpdated, HttpStatus.OK);
  }
  
  @PostMapping("/users/{username}/tasks")
  public ResponseEntity<Void> createTask(@PathVariable String username, @RequestBody Task task) {
	  Task createdTask = service.save(task);

    URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
    		.path("/{id}")
    		.buildAndExpand(createdTask.getId())
    		.toUri();
    return ResponseEntity.created(uri).build();
  }
}
