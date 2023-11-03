package br.com.apirestfull.todolistdesafio.controllers;

import br.com.apirestfull.todolistdesafio.dto.TaskDto;
import br.com.apirestfull.todolistdesafio.models.Task;
import br.com.apirestfull.todolistdesafio.services.TaskService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    private TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody @Valid TaskDto taskDto) {
        Task task = new Task();
        BeanUtils.copyProperties(taskDto, task);
        return ResponseEntity.status(HttpStatus.CREATED).body(this.taskService.createTask(task));
    }

    @GetMapping
    public ResponseEntity<List<Task>> getAllTasks() {
        return ResponseEntity.status(HttpStatus.OK).body(this.taskService.listTasks());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Task>> findByTaskId(@PathVariable(value = "id") Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(this.taskService.findTaskById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable("id") Long id, @RequestBody Task updatedTask)
            throws EntityNotFoundException {
        Task updated = this.taskService.updateTask(id, updatedTask);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public void deleteTaskId(@PathVariable(value = "id") Long id) {
         this.taskService.deleteTaskId(id);
    }
}
