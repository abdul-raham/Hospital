const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const appointmentRoutes = require('./routes/appointments');
app.use('/api/appointments', appointmentRoutes);

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
