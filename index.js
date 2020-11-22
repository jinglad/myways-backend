let express = require("express");
let cors = require("cors");
let bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
let ObjectId = require("mongodb").ObjectId;
require("dotenv").config();

let app = express();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vpsgc.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("MyWays Backend Task");
});

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const userCollection = client
    .db(process.env.DB_NAME)
    .collection("userCollection");

  app.post("/signUp", (req, res) => {
    let user = req.body;
    console.log(user);
    userCollection.insertOne(user).then((result) => {
      res.send(result.insertedCount > 0);
    });
  });
});

let port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
