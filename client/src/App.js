import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import 'bootstrap/dist/css/bootstrap.min.css';
import { taskService } from './services/api';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [showTaskForm, setShowTaskForm] = useState(false);

  // Charger les tâches lors du premier rendu
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await taskService.getAllTasks();
        setTasks(data);  // Mettre à jour les tâches avec les données récupérées de l'API
      } catch (error) {
        console.error('Erreur lors du chargement des tâches:', error);
      }
    };
    fetchTasks();
  }, []);

  // Gérer l'ajout de tâche depuis TaskForm
  const handleTaskAdded = async (newTask) => {
    // Ajouter immédiatement la nouvelle tâche à l'état local (tasks)
    setTasks((prevTasks) => [...prevTasks, newTask]);

    // Recharger les données des tâches depuis l'API pour garantir que la table affiche la tâche ajoutée
    try {
      const updatedTasks = await taskService.getAllTasks();
      setTasks(updatedTasks);  // Mettre à jour les tâches avec la dernière version de l'API
    } catch (error) {
      console.error('Erreur lors de la mise à jour des tâches:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Gestion des Tâches</h1>

      {/* Bouton pour afficher ou masquer le formulaire */}
      <button 
        className="btn btn-primary mb-4"
        onClick={() => setShowTaskForm(!showTaskForm)}
      >
        {showTaskForm ? 'Annuler' : 'Ajouter une nouvelle tâche'}
      </button>

      {/* Afficher TaskForm seulement si showTaskForm est vrai */}
      {showTaskForm && <TaskForm onTaskAdded={handleTaskAdded} />}

      {/* Afficher la liste des tâches */}
      <TaskList tasks={tasks} />
    </div>
  );
};

export default App;
