const express = require("express"); // i) first install express
const app = express(); // ii) app is used for creating a web server and routing
const mongoose = require("mongoose"); // iii) then install mongoose
const { config } = require("dotenv"); //the two lines are used for the .env file
config();
const cors = require("cors"); // cors for allow application to authorized url
const { notFound, errorHandler } = require("./Middlewares/errorHandlers");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

app.use("/api/user", userRoutes); //it is first route to get the users data or post the users data
app.use("/api/chat", chatRoutes);

app.use(notFound); // it is middleware used for handle page not found error.
app.use(errorHandler);

//these lines are used to connect mongodb in node js with the help of mongoose.
main().catch((err) => console.log(err.message)); //it executes program for the connection . if it is arrow function then we cannot use the function before the function declared
async function main() {
  const connect = await mongoose.connect(process.env.MONGODB_URI);
  console.log(`MongoDB connected ${connect.connection.host}`);
  app.listen(PORT, () => console.log("Server is running on port : " + PORT));
}

/* 
i) . after this , first create the schema for data.(go to the Models folder)
ii). after create the middleware for routes .(go to the routes folder)
*/
