import React, { useState, useEffect } from "react";
import '../styles/TaskList.css'

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "", status: "" });
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    // Realizar uma solicitação GET para o servidor para buscar as tarefas existentes
    fetch("http://localhost:8080/tasks")
      .then((response) => response.json())
      .then((data) => {
        setTasks(data);
      })
      .catch((error) => {
        console.error("Erro na solicitação:", error);
      });
  }, []);

  const handleCreateTask = () => {
    // Realizar uma solicitação POST para criar uma nova tarefa
    fetch("http://localhost:8080/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    })
      .then((response) => response.json())
      .then((data) => {
        // Adicionar a nova tarefa à lista
        setTasks([...tasks, data]);
        // Limpar o formulário
        setNewTask({ title: "", description: "", status: "" });
      })
      .catch((error) => {
        console.error("Erro ao criar a tarefa:", error);
      });
  };

  const handleDeleteTask = (taskId) => {
    // Realizar uma solicitação DELETE para excluir a tarefa
    fetch(`http://localhost:8080/tasks/${taskId}`, {
      method: "DELETE",
    })
      .then(() => {
        // Remover a tarefa da lista
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(updatedTasks);
      })
      .catch((error) => {
        console.error("Erro ao excluir a tarefa:", error);
      });
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  const handleUpdateTask = () => {
    fetch(`http://localhost:8080/tasks/${editingTask.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editingTask),
    })
      .then(() => {
        setEditingTask(null); // Limpe o estado de edição
        fetch("http://localhost:8080/tasks")
          .then((response) => response.json())
          .then((data) => {
            setTasks(data);
          })
          .catch((error) => {
            console.error("Erro na solicitação:", error);
          });
      })
      .catch((error) => {
        console.error("Erro ao atualizar a tarefa:", error);
      });
  };

  return (
    <div className="task-list">
      <div className="header">
        <h1 className="app-title">To Do List</h1>
      </div>

      <div className="task-list-container">
        <div className="subList">
          <h2 className="subtitle">Lista de Tarefas</h2>
        </div>

        <div className="create-task-listTask">
          <h2>Criar Nova Tarefa</h2>
          <input
            type="text"
            placeholder="Título da Tarefa"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            required
          />
          <textarea
            placeholder="Descrição da Tarefa"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Status da Tarefa"
            value={newTask.status}
            onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
            required
          />
          <button onClick={handleCreateTask}>Criar Tarefa</button>
        </div>

        <ul className="horizontal-list">
          {tasks.map((task) => (
            <li key={task.id} className="task-item">
              <div>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <p className="status">Status: {task.status}</p>
                <button onClick={() => handleEditTask(task)} className="edit">
                  Editar
                </button>
                <button onClick={() => handleDeleteTask(task.id)} className="delete">
                  Excluir
                </button>
              </div>
              {editingTask && editingTask.id === task.id && (
                <div>
                  <h2>Editar Tarefa</h2>
                  <input
                    type="text"
                    placeholder="Título da Tarefa"
                    value={editingTask.title}
                    onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                    required
                  />
                  <textarea
                    placeholder="Descrição da Tarefa"
                    value={editingTask.description}
                    onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Status da Tarefa"
                    value={editingTask.status}
                    onChange={(e) => setEditingTask({ ...editingTask, status: e.target.value })}
                    required
                  />
                  <button onClick={handleUpdateTask}>Salvar Alterações</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TaskList;
