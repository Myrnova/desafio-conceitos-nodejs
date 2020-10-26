const express = require("express");
const cors = require("cors");

const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title,url, techs } = request.body;

const repository = {
  id : uuid(),
  title,
  url,
  techs,  
  likes: 0
}


repositories.push(repository);
  
return response.json(repository);

});

app.put("/repositories/:id", (request, response) => {

  const { id } = request.params;
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
  console.log(repositoryIndex);

  if(repositoryIndex >= 0){
    repositories[repositoryIndex].url = request.body.url;
    repositories[repositoryIndex].title = request.body.title;
    repositories[repositoryIndex].techs = request.body.techs;
    response.status(200).json(repositories[repositoryIndex])
  }

  else if (repositoryIndex == -1){
  return response.status(400).json({ error: "Repository does not exist"});
  }
});

app.delete("/repositories/:id", (request, response) => {
 
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
  console.log(repositoryIndex);
  if(repositoryIndex >= 0){
    repositories.splice(repositoryIndex, 1);
    return response.status(204).send();
  }   
  else if (repositoryIndex == -1){
  return response.status(400).json({ error: "Repository does not exist"});
  }



});

app.post("/repositories/:id/like", (request, response) => {

  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
  if(repositoryIndex >= 0){
    repositories[repositoryIndex].likes += 1;
    response.status(200).json(repositories[repositoryIndex]);
  }
else if (repositoryIndex == -1){
  return response.status(400).json({ error: "Repository does not exist"});
}

});

module.exports = app;
