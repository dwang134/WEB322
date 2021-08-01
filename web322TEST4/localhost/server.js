var express = require("express");
const pg = require("pg");
const exphbs = require("express-handlebars"); //handle bars
const {Pool} = require("pg");
var app = express();
var conStr = "postgres://postgres:wang0407@localhost:5433/postgres";
var config = {
    user: 'postgres',
    database: 'postgres',
    password: 'wang0407',
    port: 5433,
    max: 10, 
    idleTimeoutMillis: 30000, 
    }; 
const pool = new Pool({
    connectionString: conStr
});

// HANDLEBARS
app.engine(".hbs", exphbs({ extname: ".hbs" }));
app.set("view engine", ".hbs");


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

app.listen(3000, function () { 
    console.log('Server is running.. on Port 3000');
});

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