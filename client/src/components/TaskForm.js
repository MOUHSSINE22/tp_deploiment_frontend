import React, { useState, useEffect } from 'react';
import { taskService } from '../services/api';

const TaskForm = ({ onTaskAdded }) => {
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [completed, setCompleted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Récupérer l'ID suivant basé sur les tâches existantes
  useEffect(() => {
    const fetchMaxId = async () => {
      try {
        const tasks = await taskService.getAllTasks(); // Récupérer toutes les tâches
        const maxId = tasks.reduce((max, task) => (task.id > max ? task.id : max), 0);
        setId(maxId + 1); // Définir l'ID suivant
      } catch (error) {
        console.error('Erreur lors de la récupération des tâches:', error);
      }
    };

    fetchMaxId();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    // Vérification et conversion explicite de 'completed' en booléen
    const taskCompleted = completed === true;  // assure que completed est un booléen

    // Log pour déboguer la valeur de completed avant l'envoi
    console.log('Valeur de completed:', taskCompleted);

    setSubmitting(true);
    try {
      const newTask = await taskService.createTask({ id, title, completed: taskCompleted });
      console.log('Nouvelle tâche ajoutée:', newTask);  // Log pour vérifier la réponse de l'API
      setTitle(''); // Réinitialiser le titre
      setCompleted(false); // Réinitialiser l'état complété
      if (onTaskAdded) onTaskAdded(newTask); // Ajouter la nouvelle tâche dans le parent
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="task-id" className="form-label">ID de la tâche</label>
        <input
          id="task-id"
          type="text"
          value={id}
          readOnly // Le champ ID est en lecture seule
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="task-title" className="form-label">Nom de la tâche</label>
        <input
          id="task-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nouvelle tâche"
          className="form-control"
          disabled={submitting}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="task-completed" className="form-label">Tâche complétée</label>
        <select
          id="task-completed"
          value={completed}
          onChange={(e) => setCompleted(e.target.value === 'true')} // Convertir en booléen
          className="form-control"
          disabled={submitting}
        >
          <option value={false}>Non complétée</option>
          <option value={true}>Complétée</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary" disabled={submitting}>
        {submitting ? 'Ajout...' : 'Ajouter'}
      </button>
    </form>
  );
};

export default TaskForm;
