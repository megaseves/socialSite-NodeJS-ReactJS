const express = require('express');
const cors = require('cors');
const fs = require("fs");

var data = fs.readFileSync("users.json");
var users = JSON.parse(data);


const app = express();
app.use(cors())
app.use(express.json())

let newData = {};
function addNewDataToJsonFile() {
    users.push(newData);
    var newData2 = JSON.stringify(users);
    fs.writeFile("users.json", newData2, (err) => {
      // Error checking
      if (err) throw err;
      console.log("New data added");
    });
}


app.get('/names', (req, res) => {
    res.json(users);
})

app.post('/names', (req, res) => {
    console.log('You did it!');
    newData = req.body;
    addNewDataToJsonFile()
})


const port = 8080;
app.listen(port,'localhost', function(error){
    if(!error)
        console.log("Server is Listening at Port " + port + "!");
    else
        console.log("Error Occurred");
});