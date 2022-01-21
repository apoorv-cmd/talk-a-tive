const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const connectDB = require("./config/db");
const { chats } = require("./data/data");
const path = require("path");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");

const { notFound, errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();
connectDB();

const app = express()
app.use(express.json()); // to accept json data



app.use('/api/user', userRoutes)
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);




const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}




app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server Started on PORT ${PORT}`.red.bold));