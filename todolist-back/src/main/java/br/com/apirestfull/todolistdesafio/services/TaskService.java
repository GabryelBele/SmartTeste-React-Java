package br.com.apirestfull.todolistdesafio.services;

import br.com.apirestfull.todolistdesafio.models.Task;
import br.com.apirestfull.todolistdesafio.repositories.TaskRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    private TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Transactional
    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    public List<Task> listTasks() {
        return taskRepository.findAll();
    }

    public Optional<Task> findTaskById(Long id) {
        return taskRepository.findById(id);
    }

    @Transactional
    public void deleteTaskId(Long id) {
        taskRepository.deleteById(id);
    }

    @Transactional
    public Task updateTask(Long id, Task updatedTask) {
        Optional<Task> existingTask = taskRepository.findById(id);

        if (existingTask.isPresent()) {
            Task taskToUpdate = existingTask.get();
            taskToUpdate.setTitle(updatedTask.getTitle());
            taskToUpdate.setDescription(updatedTask.getDescription());
            taskToUpdate.setStatus(updatedTask.getStatus());
            return taskRepository.save(taskToUpdate);
        } else {
            throw new EntityNotFoundException("Tarefa não encontrada com o ID: " + id);
        }
    }
}
