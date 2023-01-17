// node app 

// express 
var express = require('express');
var app = express();

// enabled CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
// to connest styles.css
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
// to connest index.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});
// first API endpoint...  //:timestamp format - 2015-12-25 or in miliseconds

app.get("/api/:timestamp", function (req, res) {
  console.log(/\d{5,}/.test(req.params.timestamp));
  if (!/\d{5,}/.test(req.params.timestamp)) {                 // Regex for timestamp or miliseconds format  
    let stringRespondDate = new Date(req.params.timestamp);   // Convert :timestamp into format what we want
    let unix = stringRespondDate.getTime();              // Unix to convert date into miliseconds
    stringRespondDate.toUTCString() === "Invalid Date" ? // Condition to render if timestamp format is correct
      res.json({"error":"Invalid Date"}) : 
      res.json({"unix": unix, "utc": stringRespondDate.toUTCString()}) 
  } else if (req.params.timestamp) {            // if timestamp is truthy value
    let unix = Number(req.params.timestamp);               
    let numberRespondDate = new Date(unix);    // unix has to be Number, for it to work, unlike string/number in previous condition if case
    res.json({"unix": unix, "utc": numberRespondDate.toUTCString()});
  } 
});
app.get("/api", (req, res) => {           // for no date, we response with current date
    let emptyRespondDate = new Date();
    res.json({"unix": emptyRespondDate.getTime(), "utc": emptyRespondDate.toUTCString()});
});
        
// listen for requests 
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
