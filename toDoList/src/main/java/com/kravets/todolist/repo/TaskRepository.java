package com.kravets.todolist.repo;

import com.kravets.todolist.model.Task;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface TaskRepository extends CrudRepository<Task, Long> {
    List<Task> findAllBy();

    List<Task> findByDate(String date);
}
