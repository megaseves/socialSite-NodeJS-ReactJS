const express = require('express');
const cors = require('cors');
const controller = require("./controller/controller");
const dotenv = require("dotenv");
const authenticateToken = require("./middleware/authorization");
const multer = require("multer");
const {S3Client, PutObjectCommand, GetObjectCommand} = require("@aws-sdk/client-s3");
const crypto = require("crypto");
const sharp = require("sharp");
const client = require("./db/dbconnection");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

dotenv.config();

const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;
// console.log(bucketName);
// console.log(bucketRegion);

const s3 = new S3Client({
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey
    },
    region: bucketRegion
});

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const app = express();
app.use(cors())
app.use(express.json())

//TODO move into another file this function
app.post("/uploadAvatar", upload.single('image'), async (req, result) => {
    //console.log("Body: ", req.body);
    //console.log("File: ", req.file);

    const userId = req.body.user_id;

    // resize image
    const buffer = await sharp(req.file.buffer).resize({fit: "cover", width: 200, height: 200 }).toBuffer()

    const imageName = randomImageName();
    const params = {
        Bucket: bucketName,
        Key: imageName,
        Body: buffer,
        ContentType: req.file.mimetype,

    };

    const command = new PutObjectCommand(params);
    await s3.send(command);

/*     const objectParams = {
        Bucket: bucketName,
        Key: imageName
    }


    const commandImageURL = new GetObjectCommand(objectParams);
    const imageURL = await getSignedUrl(s3, commandImageURL);
*/
    console.log(imageName)

    await client.query(`UPDATE users SET avatar = ($1)
        WHERE user_id = ($2)`, [imageName, userId] ,async (err, res) => {
        if (!err) {
            console.log("Successfully inserted Avatar")
            result.send({});
        } else {
            console.log(err.message);
            result.send({message: err.message});
        }
    });
    client.end;
});


app.get("/users", authenticateToken ,controller.getAllUsers);

app.get("/latestUsers", controller.getAllLatestUsers);

app.get("/profile/id", controller.getProfileById);

app.get("/profile", authenticateToken, controller.getProfile);

app.get("/friends", authenticateToken, controller.getAllFriend);

app.get("/getAllFriendRequest", authenticateToken, controller.getAllFriendRequest);

app.get("/getAllOwnRequest", authenticateToken, controller.getAllOwnRequest);

app.post("/addFriend", authenticateToken, controller.addFriend);

app.post("/removeFriend", authenticateToken, controller.removeFriend);

app.post("/users", controller.registerNewUser);

app.post("/login", controller.checkForLogin);

app.post("/check-register", controller.checkForRegister);



const port = 8080;
app.listen(port,'localhost', function(error){
    if(!error)
        console.log("Server is Listening at Port " + port + "!");
    else
        console.log("Error Occurred");
});
