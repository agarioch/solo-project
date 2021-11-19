const express = require('express');
const router = require('./router');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 4000;

const Helmet = require('helmet');

app.use(express.json());
app.use(cors());
app.use(Helmet());
app.use(router);

(async () => {
  await mongoose.connect(process.env.DB_URI);
  console.log('DB Synced');
  app.listen(port, () => console.log(`Server is running on ${port}`));
})();
