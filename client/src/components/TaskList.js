import React from 'react';

const TaskList = ({ tasks }) => {
  return (
    <div className="container mt-5">
      <h3 className="mb-4 text-center">Liste des tâches</h3>

      {/* Table Bootstrap avec un style coloré */}
      <div className="table-responsive">
        <table className="table table-hover table-bordered table-sm">
          <thead className="table-primary">
            <tr>
              <th className="text-center" scope="col">ID</th>
              <th className="text-center" scope="col">Nom de la tâche</th>
              <th className="text-center" scope="col">Statut</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr
                key={task.id}
                className={task.completed ? '' : 'table-warning'} // Applique table-warning pour les tâches non complètes
              >
                <td className="text-center">{task.id}</td>
                <td className="text-center">{task.title}</td>
                <td className="text-center">
                  {task.completed ? 'Complétée' : 'Non complétée'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskList;
