const http      = require('http');
const express   = require('express');
const path      = require('path'); 
const fs = require('fs');
const app = express();

app.use(express.static(path.join(__dirname, 'client')));

let getData = () => {  
  return fs.readFileSync('./server/modelo-resposta-api.json');
}

app.get('/data', (req, res) => {
  res.send(getData());
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/index.html'));
});

http.createServer(app).listen(3000, () => {
  console.log('Slidershow Test Project Server running at 3000 port ');
});