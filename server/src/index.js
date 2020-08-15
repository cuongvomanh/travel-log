const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const logs = require('./api/logs');
const app = express();
const middlewares = require('./middlewares');
app.use(morgan('common'));
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN,
}));
app.use(express.json());
const port = process.env.PORT || 1337;
app.get('/', (req, res) => {
  res.json({
    message: 'Hello World!',
  });
});
app.use('/api/logs', logs);
app.use(middlewares.notFound);
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(middlewares.errorHandler);
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
