const client = require('../db/dbconnection');
const bcrypt = require("bcrypt");
const jwtTokens = require("../utils/jwt-helpers");
const {PutObjectCommand} = require("@aws-sdk/client-s3");


const getAllUsers = (req, res) => {
    client.query(`Select user_id, username, email, created_on from users`, (err, result)=>{
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

const addUser = async (req, res) => {
    const user = req.body;

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const defaultImageURL = "https://social-site-facebook-copy-project.s3.eu-central-1.amazonaws.com/1b17f479bdf961a801080529df03b46be69ccfbf18ca4a5c69d0152f3bcbed5e?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDGV1LWNlbnRyYWwtMSJHMEUCIQCQn4PFKw3%2BnBE65HbhChc%2BudD5LjR5WZZmZBYhbScFWQIgPsgf4ouUtByHelXlETv42tYsorwKEfxu57RP6ath7QYq5AIIXRAAGgw3NTE5MTMxMjc2NzQiDNhdc339vbS%2BCU2n3irBAtxP2O3GxU3kvODxU%2FnzrKf0UboQ8bFU8uz1MwTWEmTeVS6Q5oNJ43sNOTF2chIOGQaJU3IqT55NF5VVa%2F9JqWdKM69Ef6Smu%2BnXaIAh6UBI3vWkafoguSCdjurSjlfdVDdppruxGEmrWWNupDwqVjB6X%2F37%2FLkkF3qllKFQyAwRg%2F3U48EV%2BDwyV8WEN2pA6ijJiPEV2zNuCjy44idmBpIaRJtEgBLZFtTiOhbN%2Fodiv7Ua6WBcn6CHguZ2OZmIdqFS0LMPVNAS5cJskgmXq%2F9VF08L9FC3tpin1isiYhh%2F2uZLwGOxP%2BZP9fHGjkPH%2F6VFNTYgC3rgX7iu2jRS7%2BwxEKNZJqBxZQcBJOLW6vtjW%2Fgke9dHzqf6TtCbYjwW2kHL9MCCbenoovt1KrEEeP1zYyvlg1AGUdITKYU5fgyjIjDC9dugBjqzAlpX5y97qktHnCZ4a0%2FKZl9Qv%2BQnt1oBgWt9GgKyjm49YnPIxSWc18lFy1gnxIqORTVD3XErgPP6ouJoqxBVGA6ukEXOdEsf6dPgSVI8J2mB67twcjUoFYHAGUrAbbXEUDCDjn%2BQD6rP91%2B5Bf9jB6sKbHGgkzCKfxXQ5w30OzldG34g78sX5YCtS0JlR4OgJLGlTK2egXYxYftdHSUKCtH8D%2Bpkbq4JV6az76RSOiQ97nZQIIWHLm5YBlbNbLjHBduWXy4p4KZXPFigSRdoPG9vucYpkJ9FZiUA1A90MyFHaSYl6474OwvrHTr8XqpdPxUk4Fg4PM3Fq3uh6BnSeRa32Gqit35KSVpuJBygI%2BZTW75Q2x1P19Q6J4NE2a38v7g6fB2H5bbRLDbOajatYbKNnC0%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230319T165412Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIA26EMDZ35BQHUVZHD%2F20230319%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Signature=6e579571cc0bdef32ec54041ecc57dd3fc1b1434b54e99a05642e9ce76db3d9b";

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


const addImage = async (req, res) => {
    console.log("Body: ", req.body);
    console.log("File: ", req.file);

    /*req.file.buffer

    const params = {
        Bucket: bucketName,
        Key: req.file.originalname,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,

    };

    const command = new PutObjectCommand(params);
    await s3.send(command);*/

    res.send({});
}



module.exports = {
    getAllUsers,
    addUser,
    getAllLatestUsers,
    checkForLogin,
    checkForRegister,
    getProfileById,
    getProfile,
    addImage
};