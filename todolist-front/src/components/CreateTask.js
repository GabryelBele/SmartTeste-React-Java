import React, { useState } from 'react';
import '../styles/CreateTask.css'

function CreateTask({ onTaskCreate }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState(''); // Adicione um estado para o status

  const handleCreate = () => {
    if (!title || !description || !status) {
      console.error('Por favor, preencha todos os campos.');
      return;
    }

    const newTask = {
      title: title,
      description: description,
      status: status, // Inclua o status no objeto
    };

    // Enviar a solicitação POST para o servidor
    fetch('http://localhost:8080/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    })
      .then((response) => {
        if (response.status === 201) {
          // Tarefa criada com sucesso, você pode atualizar a lista de tarefas ou realizar outras ações
          onTaskCreate(newTask);
          setTitle('');
          setDescription('');
          setStatus(''); // Limpe o estado do status
        } else {
          // Lidar com erros, por exemplo, exibir uma mensagem de erro
          console.error('Erro ao criar a tarefa.');
        }
      })
      .catch((error) => {
        console.error('Erro na solicitação:', error);
      });
  }

  return (
    <div id="create-task-container">
      <h2>Criar Nova Tarefa</h2>
      <input
        type="text"
        id="task-title"
        placeholder="Título da Tarefa"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        id="task-description"
        placeholder="Descrição da Tarefa"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        id="task-status"
        placeholder="Status da Tarefa"
        value={status}
        onChange={(e) => setStatus(e.target.value)} // Campo para inserir o status
      />
      <button id="create-button" onClick={handleCreate}>Criar Tarefa</button>
    </div>
  );
}

export default CreateTask;
