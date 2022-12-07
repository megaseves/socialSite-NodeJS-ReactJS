const client = require('../db/dbconnection');

const getAllUsers = (req, res) => {
    client.query(`Select * from users`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        } else {
            console.log(err.message);
        }
    });
    client.end;
}

const addUser = (req, res) => {
    //client.query(`INSERT INTO users (username, password, email, created_on) VALUES (${reg.param('username')})`)
}

module.exports = {
    getAllUsers
};