const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/users");
const pinRoute = require("./routes/pins");

dotenv.config();

app.use(express.json());

mongoose 
 .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })   
 .then(() => console.log("MongoDB connected!"))
 .catch(err => console.log(err));

app.use("/api/users", userRoute);
app.use("/api/pins", pinRoute);

const PORT = process.env.PORT || 8800;

/* app.get("/", (req, res) => {
  res.json("server start");
}); */

if(process.env.NODE_ENV === "production"){
  app.use(express.static("client/build"));
}

app.listen(PORT, () => {
  console.log("Backend server is running!");
});