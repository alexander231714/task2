import React from 'react';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import TaskForm from './TaskForm';

function CardColumn({ title, tasks, addTask, onTaskMove }) {
  const [showModal, setShowModal] = React.useState(false);
  const [selectedTask, setSelectedTask] = React.useState(null);

  // Función para abrir el modal con los detalles de la tarea o para agregar una nueva tarea
  const openModal = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setSelectedTask(null);
    setShowModal(false);
  };

  // Función para manejar el evento de soltar una tarea en la columna
  const handleDrop = (e) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('task-id');
    const newStatus = title.toLowerCase().replace(' ', '-');
    onTaskMove(taskId, newStatus);
  };

  return (
    <div
      className="col-md-3"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <Card>
        <Card.Header>{title}</Card.Header>
        <Card.Body>
          <div className="task-container">
            {/* Mapeo de las tareas y creación de elementos de tarea */}
            {tasks.map((task) => (
              <div
                key={task.id}
                className="task"
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData('task-id', task.id);
                }}
                onClick={() => openModal(task)}
              >
                <div>
                  <h5>{task.title}</h5>
                  <p>Encargado: {task.assignee}</p>
                </div>
                <span>&#9776;</span>
              </div>
            ))}
          </div>
          {/* Botón para abrir el modal y agregar una nueva tarea */}
          <Button variant="primary" onClick={() => openModal(null)}>
            Agregar Tarea
          </Button>
        </Card.Body>
      </Card>

      {/* Modal para mostrar detalles de la tarea o agregar/editar una tarea */}
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Detalles de la Tarea</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Componente TaskForm para manejar el formulario de la tarea */}
          <TaskForm task={selectedTask} addTask={addTask} closeModal={closeModal} />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default CardColumn;
