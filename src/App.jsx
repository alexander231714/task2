import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';
import CardColumn from './components/CardColumn';

function App() {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const openModal = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedTask(null);
    setShowModal(false);
  };

  const addTask = (task) => {
    setTasks([...tasks, task]);
    closeModal();
  };

  const editTask = (updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
    closeModal();
  };

  const moveTask = (taskId, newStatus) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="container">
      <h1 className="text-center">Tablero Sprint</h1>
      <div className="row">
        <CardColumn
          title="POR HACER"
          tasks={tasks.filter((task) => task.status === 'por-hacer')}
          addTask={addTask}
          onTaskMove={moveTask} 
        />
        <CardColumn
          title="EN CURSO"
          tasks={tasks.filter((task) => task.status === 'en-curso')}
          addTask={addTask}
          onTaskMove={moveTask} 
        />
        <CardColumn
          title="LISTO"
          tasks={tasks.filter((task) => task.status === 'listo')}
          addTask={addTask}
          onTaskMove={moveTask} 
        />
      </div>
    </div>
  );
}

export default App;
