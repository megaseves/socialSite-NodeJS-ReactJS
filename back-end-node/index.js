const express = require('express');
const cors = require('cors');
const controller = require("./controller/controller");


const app = express();
app.use(cors())
app.use(express.json())


app.get("/users", controller.getAllUsers);

app.post("/users", controller.addUser)


const port = 8080;
app.listen(port,'localhost', function(error){
    if(!error)
        console.log("Server is Listening at Port " + port + "!");
    else
        console.log("Error Occurred");
});