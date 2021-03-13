const express = require("express");
const cors = require("cors");


const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = []; 

app.get("/repositories", (request, response) => {
  
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  
  const { title , url , techs } = request.body

  const createRepositorie = {
    id : uuid(),
    title,
    url,
    techs,
    likes : 0

  }

  repositories.push(createRepositorie)


  return response.json(createRepositorie)

});

app.put("/repositories/:id", (request, response) => {
  
  const  { id } = request.params                                 
  

  let  myIndex = 0;
  const findRespositorie = repositories.find((item, index) => {
    if(item.id == id){
      myIndex = index

      return item
    }

  })


  if(!findRespositorie) return response.status(400).json({
    error : "invalid id  repositorie or not found respositorie"
  })


  const updated = repositories[myIndex] = {
    ...findRespositorie ,
    ...request.body,
    likes:repositories[myIndex].likes,
  }



  return response.json(updated)




});

app.delete("/repositories/:id", (request, response) => {
  
 
  const  { id } = request.params
  

  const findIndexRepositorie = repositories.findIndex(item => item.id == id)

  if(!isUuid(id) &&  findIndexRepositorie < 0) return response.status(400).json({
    error : "invalid id  repositorie or not found respositorie to  delete"
  })


    repositories.splice(findIndexRepositorie, 1)

    return response.status(204).send()




}); 




app.post("/repositories/:id/like", (request, response) => {
  
  const { id } = request.params 

  const repositorie = repositories.find(item => item.id == id)


  if(!isUuid(id) && !repositorie) return response.status(400).json({
    error : "invalid id  repositorie or not found respositorie"
  })
  
    repositorie.likes++


    return response.json(repositorie)  
});




module.exports = app;
