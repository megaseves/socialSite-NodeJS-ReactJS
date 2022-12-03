const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors())

// for test
const person = [{
  "name": "Attila",
  "age": 28
},{
  "name": "Levente",
  "age": 30
}]


app.get('/names', (req, res) => {
    res.json(person);
})


const port = 8080;
app.listen(port,'localhost', function(error){
    if(!error)
        console.log("Server is Listening at Port " + port + "!");
    else
        console.log("Error Occurred");
});