import express from "express";

const PORT = 8080;

// ! creating express app instance
const app = express();

// ping route

app.get("/", (request, response) => {
  response.status(200).json({
    message: "server is up & running",
  });
});

// *  crud user
// * register user
app.post("/auth/register", (request,response) => {
  // * implement actual user register logic
  response.status(201).json({
    message: "User Register",
    status: "success",
  });
});


// *login
app.post("/auth/login", (request,response) => {
  // * implement actual user login logic
  response.status(201).json({
    message: " user login success",
    status: "success",
  });
});

// *update profile
app.put('/user/:id',(request,response)=>{
  response.status(200).json({
    message : 'User profile update',
    status:'success',
  })
})
app.get('/user/:id',(request,response)=>{
  response.status(200).json({
    message : 'user by id fetched',
    status:'success',
  })
})
// !package 
// post
// get
// get by id
// 

//*models
// user model
// package model
// bo0king model
//

// *controllers (handlers)
// user controllers
// package controlles
// bo0king controlers

// * route
// user
// package
// booking

//*listening  on server
app.listen(PORT, () => {
  console.log(`server is up and running at http://localhost:${PORT}`);
  console.log(`press ctrl + c to close server..`);
});
