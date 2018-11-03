const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// app.use(express.static(__dirname + '/views' ));


const routes = require('./app/routes/index.js');
routes(app);

app.get('/', function(req, res){
    res.sendFile('index.html', { root: __dirname + "/views" } );
});


app.listen(port, function() {
  console.log("Listening on " + port);
});
