var express = require("express");
const pg = require("pg");
const {Pool} = require("pg");
var app = express();
var conStr = "postgres://postgres:wang0407@localhost:5432/postgres";
const pool = new Pool({
    connectionString: conStr
});

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
            res.status(200).send(result.rows);
        });
    });
});

app.listen(3000, function () { 
    console.log('Server is running.. on Port 3000');
});