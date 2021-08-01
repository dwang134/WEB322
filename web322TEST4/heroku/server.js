var express = require("express");
const pg = require("pg");
const exphbs = require("express-handlebars"); //handle bars
const {Pool} = require("pg");
var app = express();
var conStr = "postgres://msdeceohbmcejx:f46f860c92caf58abb3f4822874088c27e442b3ba5e9e51f775ff7a4f05e2d4e@ec2-174-129-227-128.compute-1.amazonaws.com:5432/d1i0dvf98mbphk";
var config = {
    user: 'msdeceohbmcejx',
    database: 'd1i0dvf98mbphk',
    password: 'f46f860c92caf58abb3f4822874088c27e442b3ba5e9e51f775ff7a4f05e2d4e',
    port: 5432,
    max: 10, 
    idleTimeoutMillis: 30000, 
    connectionString: "postgres://msdeceohbmcejx:f46f860c92caf58abb3f4822874088c27e442b3ba5e9e51f775ff7a4f05e2d4e@ec2-174-129-227-128.compute-1.amazonaws.com:5432/d1i0dvf98mbphk"
    }; 
const pool = new Pool({
    connectionString: conStr
});


// HANDLEBARS
app.engine(".hbs", exphbs({ extname: ".hbs" }));
app.set("view engine", ".hbs");


var HTTP_PORT = process.env.PORT || 8080; //LISTENS TO INTERNET 


app.get("/", function(req, res, next) {
    pool.connect(function(err, client, done) {
        if (err) {
            console.log("not able to get connection " + err);
            res.status(400).send(err);
        }
        client.query("SELECT * FROM public.\"Employee\" where empid= $1", [1], function(err, result) {
            done();
            if (err) {
                console.log(err);
                res.status(400).send(err);
            }
            res.status(200).render('index', {
                data: result.rows,
                layout: false});
        });
    });
});

app.listen(HTTP_PORT);

app.get('/sp', function (req, res, next) {
    pool.connect(function(err,client,done) {
    if(err){
       res.status(400).send(err);
   }
    client.query('SELECT * FROM public.\"GetAllEmployee\"()' ,function(err,result) {
    done(); // closing the connection;
    if(err){
    console.log(err);
    res.status(400).send(err);
   }
   res.status(200).render('index', {
       data: result.rows,
       layout: false});
   });
   });
   }); 

   var pool2 = new pg.Pool(config); 
   app.get('/pool', function (req, res) {
    pool2.connect(function(err,client,done) {
    if(err){
    console.log("not able to get connection "+ err);
    res.status(400).send(err);
     }
    client.query('SELECT * FROM public.\"GetAllEmployee\"()' ,function(err,result)
    
     {
     //call `done()` to release the client back to the pool
    done();
     if(err){
    console.log(err);
    res.status(400).send(err);
    }
    res.status(200).render('index', {
        data: result.rows,
        layout: false});
    });
    });
    }); 