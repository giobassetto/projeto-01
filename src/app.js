const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = { title, url, techs, id: uuid(), likes: 0 };

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { title, url, techs } = request.body;

  const index = repositories.findIndex(
    (repository) => repository.id === request.params.id
  );

  if (index < 0) {
    return response.status(400).json({ error: "Project not found" });
  }

  const project = {
    title,
    url,
    techs,
    id: repositories[index].id,
    likes: repositories[index].likes,
  };

  repositories[index] = project;

  return response.json(project);
});

app.delete("/repositories/:id", (request, response) => {
  const index = repositories.findIndex(
    (repository) => repository.id === request.params.id
  );

  if (index < 0) {
    return response.status(400).json({ error: "Project not found" });
  }

  repositories.splice(index, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const index = repositories.findIndex(
    (repository) => repository.id === request.params.id
  );

  if (index < 0) {
    return response.status(400).json({ error: "Project not found" });
  }

  repositories[index].likes += 1;

  return response.json(repositories[index]);
});

module.exports = app;
