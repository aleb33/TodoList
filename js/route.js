const express = require('express');
const app = express();

app.get('/',(req,res) => {
  res.sendFile('./index.html',{root:__dirname, mime:'text/css'});
  //__dirname : It will resolve to your project folder.
});
//add the router
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');