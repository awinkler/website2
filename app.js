const express         = require('express'),
      app             = express(),
      bodyParser      = require('body-parser'),
      mongoose        = require('mongoose'),
      methodOverride  = require('method-override'),
      flash           = require("connect-flash"),
      session         = require("express-session"),
      posts           = require('./posts'),
      path            = require('path');

const indexRoute      = require("./routes/index");
      blogRoute       = require("./routes/blog");


// connect to the DB (use low/long version string)
const db = "website" 
var urlLocal = "mongodb://localhost/" + db;
var urlAtlas = "mongodb://alex:veryeasy@cluster0-shard-00-00-mw8ok.gcp.mongodb.net:27017,cluster0-shard-00-01-mw8ok.gcp.mongodb.net:27017,cluster0-shard-00-02-mw8ok.gcp.mongodb.net:27017/"+ db + "?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true"
mongoose.connect(urlAtlas, { useNewUrlParser: true });


// configure express
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static(__dirname + "/public"));
app.use('/pdf', express.static(__dirname + '/pathToPDF'));
app.use(methodOverride("_method"));

// to use flash messages
app.use(flash());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}))



// add variable to all ejs files
// remember, console.log(req.flash("error") erases the flash
app.use((req, res, next) => {
  res.locals.posts   = posts;
  res.locals.error   = req.flash("error");
  res.locals.success = req.flash("success");
  res.locals.pdfs    = "https://storage.googleapis.com/concise-hue-230505.appspot.com/pdfs"; // files hosted in google cloud bucket
  next();
});


// use routes
app.use("/", indexRoute);
app.use("/blog", blogRoute);



app.get('/phd-thesis', (req, res) => {
  res.sendFile(path.join(__dirname,'phd-thesis.html'));
});





// start the server
app.listen(process.env.PORT || 8080, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on 8080`)
})