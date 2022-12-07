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
    const user = req.body;
    console.log(user)
    let insertQuery = (`INSERT INTO users (username, password, email, created_on) 
        VALUES (${user.username}, ${user.password}, ${user.email}, current_date)`);

    client.query(insertQuery, (err) =>{
        if(!err) {
            res.send("Insertion was successful");
        } else {
            console.log(err.message);
        }
    });
    client.end;
}

module.exports = {
    getAllUsers,
    addUser
};