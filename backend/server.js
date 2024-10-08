const path =require('path')
const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 5000;

// Connect to DB
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/sales", require("./routes/salesRoutes"));
app.use("/api/expense", require("./routes/expenseRoutes"));
app.use("/api/cashFund", require("./routes/cashFundRoutes"));
app.use("/api/supply", require("./routes/supplyRoutes"));

//Serve frontend
if (process.env.NODE_ENV === "production") {
  // set build folder as static
  app.use(express.static(path.join(__dirname, "../frontend/build"), {dotfiles:'allow'}));

  app.get("*", (req, res) =>
    res.sendFile(__dirname, "../", "frontend", "build", "index.html")
  );
}

app.get("/", (req, res) => {
  res.status(201).json({ message: "Welcome to Laundry Shop Application System" });
});



app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
