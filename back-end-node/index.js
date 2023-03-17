const express = require('express');
const cors = require('cors');
const controller = require("./controller/controller");
const dotenv = require("dotenv");
const authenticateToken = require("./middleware/authorization");

dotenv.config();

const app = express();
app.use(cors())
app.use(express.json())


app.get("/users", authenticateToken ,controller.getAllUsers);

app.get("/latestUsers", controller.getAllLatestUsers);

app.get("/profile", controller.getProfileById);

app.post("/users", controller.addUser);

app.post("/login", controller.checkForLogin);

app.post("/check-register", controller.checkForRegister);



const port = 8080;
app.listen(port,'localhost', function(error){
    if(!error)
        console.log("Server is Listening at Port " + port + "!");
    else
        console.log("Error Occurred");
});