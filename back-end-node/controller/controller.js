const client = require('../db/dbconnection');
const bcrypt = require("bcrypt");
const jwtTokens = require("../utils/jwt-helpers");
const {PutObjectCommand} = require("@aws-sdk/client-s3");


const getAllUsers = (req, res) => {
    client.query(`Select user_id, username, email, avatar, created_on from users`, (err, result)=>{
        if(!err){
            res.send({result: result.rows, message: "It's OK!"})
        } else {
            res.send({result: "", message: "It's NOT ok!"})
            console.log(err.message);
        }
    });
    //console.log(req.headers);
    client.end;
}

const registerNewUser = async (req, res) => {
    const user = req.body;

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const defaultImageURL = "defaultAvatar.jpg";

    await client.query(`INSERT INTO users (username, password, email, avatar, created_on)
           VALUES ($1, $2, $3, $4, current_date)`, [user.username, hashedPassword, user.email, defaultImageURL] ,(err, result) => {
                if(!err){
                    console.log("Successfully inserted")
                    res.send({result: result.rows, message: "", ok:true})
                } else {
                    console.log(err.message);
                    res.send({message: err.message, ok:false});
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
    const {email, password} = req.body;

    client.query(`SELECT * FROM users WHERE email = $1`, [email], async (err, result) => {
        if (result.rows.length === 0) {
            // Empty array
            console.log(result.rows);
            res.send({message: "Email is incorrect!", ok: false});
        } else if (err) {
            res.send({message: "Something is wrong!", ok: false});
        } else {
            console.log(result.rows[0].password)
            const validPassword = await bcrypt.compare(password, result.rows[0].password);
            if(!validPassword) {
               res.send({message: "Password is incorrect!", ok: false});
            } else {
                let tokens = jwtTokens(result.rows[0]);
                res.cookie('refresh_token',tokens.refreshToken,{httpOnly:true});
                res.json(tokens);
                //res.send({result: result.rows, message: "It's OK!", ok: true})
            }
        }
    });
    client.end;
}

const checkForRegister = (req, res) => {
    const email = req.body.email;

    client.query(`SELECT *
                  FROM users
                  WHERE email = $1`, [email], (err, result) => {
        if (err) {
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
    await client.query(`SELECT user_id, username, email, avatar, created_on FROM users WHERE user_id = $1`, [id], (err, result)=>{
        if(!err){
            console.log("PROFILE By Id: " + JSON.stringify(result.rows[0]));
            res.send(JSON.stringify(result.rows[0]));
        } else {
            console.log(err.message);
        }
    });
    client.end;
}
const getProfile = async (req, res) => {
    const id = req.query.id;

    await client.query(`SELECT * FROM users WHERE user_id = $1`, [id], (err, result)=>{
        if(!err){
            console.log("MY PROFILE: " + JSON.stringify(result.rows[0]));
            res.send(JSON.stringify(result.rows[0]));
        } else {
            console.log(err.message);
        }
    });
    client.end;
}

const addFriend = async (req, res) => {
    const user_id = req.body.user_id;
    const friend_id = req.body.friend_id;
    const status = 'request';

    await client.query(`SELECT * FROM friends WHERE user_id = $1 AND friend_id = $2`, [user_id, friend_id], async (err, result) => {
        if (!err) {
            if (result.rows[0] === undefined) {

                //console.log("She/He is NOT my friend");
                await client.query(`INSERT INTO friends (user_id, friend_id, status)
                                    VALUES ($1, $2, $3)`, [user_id, friend_id, status], (err, result) => {
                    if (!err) {
                        //console.log("SUCESSFULY INSERT TO FRIEND");
                        res.send("SUCESSFULY INSERT TO FRIEND");
                    } else {
                        //console.log("ERROR addFriend: ", err.message);
                        res.send("ERROR addFriend: ", err.message);
                    }
                });

            } else {
                //console.log(result.rows[0]);
                //console.log("He/She is already my Friend");
                res.send({message: "He/She is already my Friend", ok: false});
            }

        } else {
            //console.log("ERROR addFriend: ", err.message);
            res.send("ERROR addFriend: ", err.message);
        }
    });
    client.end;
}

const checkFriendStatus = async (req, res, error) => {
    const user_id = req.body.user_id;
    const friend_id = req.body.friend_id;
    const defaultStatus = 'request';

    let isSent = false;
/*    console.log("She/He is NOT my friend");
    res.send({friendStatus: "Add friend"});*/

    if(user_id === friend_id) {
        console.log("This is you");
        isSent = true;
        res.send({friendStatus: "This is you", code: 0});
    }

    if(!isSent) {
        await client.query(`SELECT user_id, friend_id, status FROM friends 
         WHERE user_id = $1 AND friend_id = $2`, [user_id, friend_id], async (err, result) => {
        if (!err) {
            if (result.rows[0] !== undefined) {

                    await client.query(`SELECT user_id, friend_id, status FROM friends 
                         WHERE user_id = $1 AND friend_id = $2 AND status = $3`, [user_id, friend_id, 'request'], async (err, result) => {
                        if (!err) {
                            if (result.rows[0] !== undefined) {

                                console.log("Cancel request");
                                isSent = true;
                                res.send({friendStatus: "Cancel request", code: 2});

                            }

                            if (!isSent) {

                                await client.query(`SELECT *
                                                    FROM friends
                                                    WHERE user_id = $1
                                                      AND friend_id = $2
                                                      AND status = $3`, [user_id, friend_id, 'friend'], async (err, result) => {
                                    if (!err) {
                                        if (result.rows[0] !== undefined) {
                                            console.log("You are friends");
                                            isSent = true;
                                            res.send({friendStatus: "Friend", code: 3});
                                        }

                                    } else {
                                        console.log("ERROR addFriend: ", err.message);
                                        res.send("ERROR addFriend: ", err.message);
                                    }

                                });

                            }

                        } else {
                             console.log("ERROR addFriend: ", error.message);
                             res.send("ERROR addFriend: ", error.message);
                        }
                    });

            } else {

                console.log("You are NOT friend yet");
                res.send({friendStatus: "Add friend", code: 1});

            }
        } else {
             console.log("ERROR addFriend: ", error.message);
             res.send("ERROR addFriend: ", error.message);
        }

    });
    }
    client.end;
}




module.exports = {
    getAllUsers,
    registerNewUser,
    getAllLatestUsers,
    checkForLogin,
    checkForRegister,
    getProfileById,
    getProfile,
    addFriend,
    checkFriendStatus
};