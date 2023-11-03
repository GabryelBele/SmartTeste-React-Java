import React, { useState } from 'react';

function UpdateTask({ task, onUpdate }) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleUpdate = () => {
    const updatedTask = {
      id: task.id,
      title: title,
      description: description,
    };
    onUpdate(updatedTask);
  }

  return (
    <div>
      <h2>Editar Tarefa</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleUpdate}>Salvar Alterações</button>
    </div>
  );
}

export default UpdateTask;
