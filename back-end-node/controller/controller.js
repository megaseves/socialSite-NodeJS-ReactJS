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

const addUser = async (req, res) => {
    const user = req.body;
    await client.query(`INSERT INTO users (username, password, email, created_on)
                       VALUES ($1, $2, $3, current_date)`, [user.username, user.password, user.email]);
    client.end;
}

module.exports = {
    getAllUsers,
    addUser
};