import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function TaskForm({ task, addTask, closeModal, onTaskEdit }) {
  // Estado local para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: '',
    comments: '',
    assignee: '',
    assignedTo: '', 
    points: '', 
    status: 'por-hacer', // Valor inicial del estado de la tarea
  });

  // Efecto para actualizar el estado del formulario cuando se selecciona una tarea existente para edición
  useEffect(() => {
    if (task) {
      setFormData({ ...task }); // Si hay una tarea, carga sus datos en el formulario para editar
    } else {
      // Si no hay una tarea (nueva tarea), establece valores iniciales en el formulario
      setFormData({
        id: Date.now().toString(),
        title: '',
        description: '',
        comments: '',
        assignee: '',
        assignedTo: '',
        points: '',
        status: 'por-hacer', // Estado por defecto para una nueva tarea
      });
    }
  }, [task]);

  // Función para manejar cambios en los campos del formulario
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (task) {
      // Si task existe, significa que estamos editando una tarea existente
      onTaskEdit(formData); // Llama a la función de edición con los nuevos datos del formulario
    } else {
      // Si no hay task (nueva tarea), agregamos una nueva tarea
      addTask(formData); // Llama a la función para agregar una nueva tarea con los datos del formulario
    }
    closeModal(); // Cierra el modal después de agregar o editar la tarea
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* Campo de entrada para el título de la tarea */}
      <Form.Group controlId="title">
        <Form.Label>Título</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </Form.Group>

      {/* Campo de entrada para la descripción de la tarea */}
      <Form.Group controlId="description">
        <Form.Label>Descripción</Form.Label>
        <Form.Control
          as="textarea"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
        />
      </Form.Group>

      {/* Campo de entrada para comentarios */}
      <Form.Group controlId="comments">
        <Form.Label>Comentarios</Form.Label>
        <Form.Control
          as="textarea"
          name="comments"
          value={formData.comments}
          onChange={handleChange}
          rows={3}
        />
      </Form.Group>

      {/* Campo de entrada para el encargado de la tarea */}
      <Form.Group controlId="assignee">
        <Form.Label>Encargado</Form.Label>
        <Form.Control
          type="text"
          name="assignee"
          value={formData.assignee}
          onChange={handleChange}
        />
      </Form.Group>

      {/* Campo de entrada para asignado a */}
      <Form.Group controlId="assignedTo">
        <Form.Label>Asignado a</Form.Label>
        <Form.Control
          type="text"
          name="assignedTo"
          value={formData.assignedTo}
          onChange={handleChange}
        />
      </Form.Group>

      {/* Campo de entrada para puntos */}
      <Form.Group controlId="points">
        <Form.Label>Puntos</Form.Label>
        <Form.Control
          type="text"
          name="points"
          value={formData.points}
          onChange={handleChange}
        />
      </Form.Group>

      {/* Campo de selección para el estado de la tarea */}
      <Form.Group controlId="status">
        <Form.Label>Estado de la Tarea</Form.Label>
        <Form.Control
          as="select"
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="por-hacer">Por Hacer</option>
          <option value="en-curso">En Curso</option>
          <option value="listo">Listo</option>
        </Form.Control>
      </Form.Group>

      {/* Botón para guardar los cambios o agregar una nueva tarea */}
      <Button variant="primary" type="submit">
        Guardar
      </Button>
    </Form>
  );
}

export default TaskForm;
