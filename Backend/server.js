const express = require("express");
const cors= require("cors");
const mongoose = require ("mongoose"); //database connection
const userRoute = require("./routes/user");
const overviewRoute = require("./routes/overview");
const testRoute = require ("./routes/test");
const memeRoute = require ("./routes/memeRoute");

require("dotenv").config();


const app=express();
const port=process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api/user", userRoute);
app.use("/api/overview", overviewRoute);
app.use("/test", testRoute);
app.use("/api/meme", memeRoute);



//connection to mongodb database using the uri string from https://cloud.mongodb.com/v2/619692584f5bc30abb7c53e9#clusters/connect?clusterId=Cluster-1
const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});