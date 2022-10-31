package com.kravets.todolist.controllers;

import com.kravets.todolist.model.Task;
import com.kravets.todolist.repo.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class DBController {
    @Autowired
    TaskRepository taskRepository;

    @GetMapping ("/saveTask")
    public ResponseEntity save(@RequestParam("taskText") String taskTextParam, @RequestParam("done") boolean doneParam, @RequestParam("date") String dateParam){
        Task task = new Task(taskTextParam, doneParam, dateParam);
        taskRepository.save(task);
        return ResponseEntity.status(HttpStatus.CREATED).body(task);
    }

    @GetMapping ("/getAll")
    public ResponseEntity getAll(){
        List<Task> allLists = taskRepository.findAllBy();
        String text = "{";
        for (int i = 0; i < allLists.size(); i++){
            if (i != allLists.size()-1){
                text = text+"\""+allLists.get(i).getDate()+"\":{\"done\":\""+allLists.get(i).isDone()+"\", \"taskText\":\""+allLists.get(i).getTaskText()+"\"}, ";

            }else {
                text = text+"\""+allLists.get(i).getDate()+"\":{\"done\":\""+allLists.get(i).isDone()+"\", \"taskText\":\""+allLists.get(i).getTaskText()+"\"}}";
            }
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(text);
    }

    @GetMapping ("/updateDone")
    public ResponseEntity updateDone(@RequestParam("done") boolean doneParam, @RequestParam("date") String dateParam){
        Task task = taskRepository.findByDate(dateParam).get(0);
        task.setDone(doneParam);
        taskRepository.save(task);
        return ResponseEntity.status(HttpStatus.CREATED).body(task);
    }
}
