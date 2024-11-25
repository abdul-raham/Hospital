const express = require('express');
const mongoose = require('mongoose');
const appointmentsRouter = require('./routes/appointments');

const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect('mongodb://localhost:27017/appointments', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Routes
app.use('/api/appointments', appointmentsRouter);

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
