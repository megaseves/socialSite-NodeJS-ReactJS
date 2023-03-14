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
           VALUES ($1, $2, $3, current_date)`, [user.username, user.password, user.email] ,(err, result) => {
                if(!err){
                    console.log("Successfully inserted")
                    res.send({result: result.rows, message: "", ok:true})
                } else {
                    console.log(err.message);
                }
        });
    client.end;
}

const getAllLatestUsers = (req, res) => {
    client.query(`SELECT * FROM users ORDER BY user_id DESC LIMIT 8`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        } else {
            console.log(err.message);
        }
    });
    client.end;
}

const checkForLogin = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    client.query(`SELECT * FROM users WHERE email = $1 AND password = $2`, [email, password], (err, result) => {
        if(err){
            res.send({message: "Something goes wrong!", ok:false});
        }
        if (result.rows.length === 0) {
            // Empty array
            res.send({message: "Incorrect Username or Password!", ok:false})
        } else {
            // Correct data
            res.send({result: result.rows, message: "Incorrect Username or Password!", ok:true})
        }
    });
    client.end;
}

const checkForRegister = (req, res) => {
    const email = req.body.email;

    client.query(`SELECT * FROM users WHERE email = $1`, [email], (err, result) => {
        if(err){
            res.send({message: "Something goes wrong!"});
        }
        if (result.rows.length === 0) {
            // Empty array
            res.send({message: "It's OK!", ok: true})
            console.log("It's OK!")
        } else {
            // Correct data
            console.log("Already registered email!")
            console.log(result.rows)
            res.send({message: "Already registered email!", ok: false})
        }
    });
    client.end;
}


const getProfileById = async (req, res) => {
    const id = req.query.id;
    await client.query(`SELECT * FROM users WHERE user_id = $1`, [id], (err, result)=>{
        if(!err){
            console.log("I found it: " + JSON.stringify(result.rows[0]));
            res.send(JSON.stringify(result.rows[0]));
        } else {
            console.log(err.message);
        }
    });
    client.end;
}

module.exports = {
    getAllUsers,
    addUser,
    getAllLatestUsers,
    checkForLogin,
    checkForRegister,
    getProfileById
};