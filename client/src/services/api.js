import axios from 'axios';
const API_URL = 'http://localhost:5000/api';
// Créer une instance axios avec la configuration de base
const apiClient = axios.create({
 baseURL: API_URL,
 headers: {
   'Content-Type': 'application/json'
 }
});
// Fonctions pour interagir avec l'API
export const taskService = {
 // Récupérer toutes les tâches
 getAllTasks: async () => {
   try {
     const response = await apiClient.get('/tasks');
     return response.data;
   } catch (error) {
     console.error('Erreur lors de la récupération des tâches:', error);
     throw error;
   }
 },
 // Ajouter une nouvelle tâche
 createTask: async (taskData) => {
   try {
     const response = await apiClient.post('/tasks', taskData);
     return response.data;
   } catch (error) {
     console.error('Erreur lors de la création de la tâche:', error);
     throw error;
   }
 }
};