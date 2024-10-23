const fs = require('fs');
const https = require('https');
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 8002;

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem'),
};

app.use(express.static(path.join(__dirname)));

https.createServer(options, app).listen(port, () => {
  console.log(`Inner server running at https://inner.local:${port}/`);
});