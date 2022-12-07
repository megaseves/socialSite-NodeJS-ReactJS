const client = require("./dbconnection");

function getAllUsers() {
    client.connect()
    client.query(`Select * from users`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
}

module.exports = getAllUsers;