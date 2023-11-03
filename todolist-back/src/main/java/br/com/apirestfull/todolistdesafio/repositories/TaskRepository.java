package br.com.apirestfull.todolistdesafio.repositories;

import br.com.apirestfull.todolistdesafio.models.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
}
