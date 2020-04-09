import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

// https://github.com/Rocketseat/bootcamp-gostack-desafios/tree/master/desafio-conceitos-reactjs
/**
 * Missing create the Backend
 */

function App() {
  const [ repositories, setRepositories ] = useState([]);
  
  async function handleAddRepository() {

    const response = await api.post('repositories', {
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"]
    });

    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`repositories/${id}`);

      setRepositories(repositories.filter(repository => repository.id !== id));
    } catch (error) {
      alert(`Error trying to delete a Repository. ERROR Message: ${error.message}`);
    }
  }

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  });

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
