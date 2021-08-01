/*********************************************************************************
* WEB322 – Assignment 02
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part
* of this assignment has been copied manually or electronically from any other source
* (including 3rd party web sites) or distributed to other students.
*
* Name: Dylan Wang  Student ID: 114099187   Date: September/25/2019
*
* Online (Heroku) Link: https://radiant-plains-89012.herokuapp.com/
*
********************************************************************************/ 

var express = require("express");
var data_service = require("./data-service.js"); 
var path = require("path");
var app = express();

var HTTP_PORT = process.env.PORT || 8080;

function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
    return new Promise(function(res, req) {
        data_service.initialize().then(function(data) {
            console.log(data)
        }).catch(function(err) {
            console.log(err);
        });
    });
}

app.use(express.static('public'));

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname + "/views/home.html"));
});

app.get("/about", function(req, res) {
    res.sendFile(path.join(__dirname + "/views/about.html"));
});

app.get("/employee/:num", function(req, res) {
    data_service.getEmployeeByNum(req.params.num).then(function(data) {
        res.json(data);
    }).catch(function(err) {
        res.json({ message: err });
    });
});

app.get("/managers", function(req, res) {
    data_service.getManagers().then(function(data) {
        res.json(data);
    }).catch(function(err) {
        res.json({ message: err });
    });
});

app.get("/departments", function(req, res) {
    data_service.getDepartments().then(function(data) {
        res.json(data);
    }).catch(function(err) {
        res.json({ message: err });
    });
});

app.get("/employees", function(req, res) {

    if (req.query.status) 
    {
        data_service.getEmployeesByStatus(req.query.status).then(function(data) {
            res.json(data);
        }).catch(function(err) {
            res.json({ message: err });
        });
    } else if (req.query.department) {
        data_service.getEmployeesByDepartment(req.query.department).then(function(data) {
            res.json(data);
        }).catch(function(err) {
            res.json({ message: err });
        });
    } else if (req.query.manager) {
        data_service.getEmployeesByManager(req.query.manager).then(function(data) {
            res.json(data);
        }).catch(function(err) {
            res.json({ message: err });
        });
    } else {
        data_service.getAllEmployees().then(function(data) {
            res.json(data);
        }).catch(function(err) {
            res.json({ message: err });
        });
    }
});

app.use(function(req, res) {
    res.status(404).send("Page Not Found.");
});

app.listen(HTTP_PORT, onHttpStart);