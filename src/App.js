import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(value => setProjects(value.data));
  }, []);

  async function handleAddRepository() {
    // TODO
    const response = await api.post('/repositories', {
      title: "Yggdrasil",
      url: "https://github.com/siomar/Yggdrasil",
      techs: ["React Native", "Javascript"]
    });

    setProjects([...projects, response.data]);
  }

  async function handleRemoveRepository(id) {
    // TODO
    await api.delete(`/repositories/${id}`);
    const projectIndex = projects.findIndex((project) => project.id === id);
    projects.splice(projectIndex, 1);
    setProjects([...projects]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          projects.map((item, index) => (
            <li key={item.id}>
              <h4>{item.title}</h4>
              <button onClick={() => handleRemoveRepository(item.id)}>
                Remover
            </button>
            </li>
          ))
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
