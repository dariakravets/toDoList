package com.kravets.todolist.model;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "tasks")
public class Task implements Serializable {
    private static final long serialVersionUID = -3548856575757564553L;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private int id;
    @Column(name = "tasktext")
    private String taskText;
    @Column(name = "done")
    private boolean done;
    @Column(name = "date")
    private String date;

    public Task(String taskText, boolean done, String date) {
        this.taskText = taskText;
        this.done = done;
        this.date = date;
    }

    public Task() {
    }

    @Override
    public String toString() {
        return "Task{" +
                "id=" + id +
                ", taskText='" + taskText + '\'' +
                ", done=" + done +
                ", date='" + date + '\'' +
                '}';
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setTaskText(String taskText) {
        this.taskText = taskText;
    }

    public void setDone(boolean done) {
        this.done = done;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public int getId() {
        return id;
    }

    public String getTaskText() {
        return taskText;
    }

    public boolean isDone() {
        return done;
    }

    public String getDate() {
        return date;
    }
}
