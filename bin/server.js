const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const { getCORSOrigin } = require('../config');
const { attachResponseBuilder } = require('../common/express-builder');

const app = express();

app.use(express.json());
app.use(helmet());

app.get('/ping', (_, res) => res.send('pong'));

app.use(cors({
    origin: getCORSOrigin(),
    credentials: true,
}));

app.use(attachResponseBuilder);

module.exports = app;
