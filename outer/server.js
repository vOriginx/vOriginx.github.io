const fs = require('fs');
const https = require('https');
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8001;

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem'),
};

app.use(express.static(path.join(__dirname)));

https.createServer(options, app).listen(port, () => {
  console.log(`Server running at https://outer.local:${port}/`);
});