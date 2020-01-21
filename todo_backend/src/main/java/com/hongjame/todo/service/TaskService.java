package com.hongjame.todo.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hongjame.todo.model.Task;
import com.hongjame.todo.repository.TaskRepository;

@Service
public class TaskService {
	
  @Autowired
  private TaskRepository repo;	
  
  private List<Task> tasks;
  private long idCounter = 0;

  public List<Task> findAll() {
	  tasks = repo.findAll();
	  idCounter = tasks.size();
	  System.out.println("Total # of rows:" + idCounter);
    return tasks;
  }
  public Task save(Task task) {
    if (task.getId() == -1 || task.getId() == 0) {
      System.out.println("Added new entry#" + idCounter + " : " + task.getDescription());
      repo.save(task);
    } else {
      deleteById(task.getId());
      repo.save(task);
    }
    return task;
  }
  
  public Task deleteById(long id) {
    Task task = findById(id);
    System.out.println("Delete by Id# : "+ task.getId());
    if (task.getId() == id) {
    	repo.deleteById(id);
    } else {
    	return null;
    }
    return task;
  }
  
  
  public Task findById(long id) {
    for (Task task : tasks) {
      if (task.getId() == id) {
        return task;
      }
    }
    return null;
  }
}