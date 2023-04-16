const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// server.js

// Other imports...
const authRoutes = require('./routes/authRoutes');
const itemsRoutes = require('./routes/itemsRoutes');

// Other middleware...
app.use('/api/auth', authRoutes);
app.use('/api/items', itemsRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
