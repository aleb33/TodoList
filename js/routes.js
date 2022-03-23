const express = require('express');
const app = express();
const router = express.Router();
app.use(express.static('../source/'));
const source='../source/';

app.get('',(req,res) => {
  res.sendFile(source+'index.html',{root: source, mime:'text/css'});
  //__dirname : It will resolve to your project folder.
});
//add the router
app.use('/', router);
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');