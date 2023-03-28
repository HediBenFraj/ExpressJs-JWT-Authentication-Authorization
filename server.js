const config = require("config");
const express = require("express"); // imports express
const cors = require("cors"); // imports cors
const mongoose = require("mongoose"); //imports mongoose

require("dotenv").config(); // imports dotenv

const app = express(); // creating an express app
const port = process.env.PORT || 5000; // defining the port as being 5000

app.use(cors()); // our app uses cors
app.use(express.json()); // and uses express.json

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined");
  process.exit(1);
}

try {
  mongoose.connect(
    "mongodb+srv://hedi:hedi@cluster0.stuqpu3.mongodb.net/?retryWrites=true&w=majority",
    { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true },
    function (err, db) {
      if (err) throw err;
      else console.log("connected");
    }
  );
} catch (err) {
  console.log(err);
  process.exit(1);
}

const usersRouter = require("./routes/users"); //defining the users route which is /users
const authRouter = require("./routes/auth");

app.use("/api/users", usersRouter); //and our users route
app.use("/api/auth", authRouter);

app.listen(port, () => {
  //specifiying at which port the app listens
  console.log("server is running on port :", port);
});

//To run the server we need to type :nodemon server in the console
