const express = require('express');
const cors = require('cors');
const controller = require("./controller/controller");
const dotenv = require("dotenv");
const authenticateToken = require("./middleware/authorization");
const multer = require("multer");
const {S3Client, PutObjectCommand} = require("@aws-sdk/client-s3");

dotenv.config();
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

//TODO TEST
app.post("/putAnImage", upload.single('image'), async (req, res) => {
    console.log("Body: ", req.body);
    console.log("File: ", req.file);

    req.file.buffer

    const params = {
        Bucket: bucketName,
        Key: req.file.originalname,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,

    };

    const command = new PutObjectCommand(params);
    await s3.send(command);

    res.send({});
});


app.get("/users", authenticateToken ,controller.getAllUsers);

app.get("/latestUsers", controller.getAllLatestUsers);

app.get("/profile/id", controller.getProfileById);

app.get("/profile", authenticateToken, controller.getProfile);

app.post("/users", controller.addUser);

app.post("/login", controller.checkForLogin);

app.post("/check-register", controller.checkForRegister);



const port = 8080;
app.listen(port,'localhost', function(error){
    if(!error)
        console.log("Server is Listening at Port " + port + "!");
    else
        console.log("Error Occurred");
});
