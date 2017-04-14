"use strict";
var express     = require('express'),
    bodyParser  = require('body-parser'),
    fs          = require('fs'),
    app         = express(),
    users   = JSON.parse(fs.readFileSync('data/users.json', 'utf-8')),
    states      = JSON.parse(fs.readFileSync('data/states.json', 'utf-8'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Would normally copy necessary scripts into src folder (via grunt/gulp) but serving
//node_modules directly to keep everything as simple as possible
app.use('/node_modules', express.static(__dirname + '/node_modules')); 

//The src folder has our static resources (index.html, css, images)
app.use(express.static(__dirname + '/src')); 

app.get('/api/users/page/:skip/:top', (req, res) => {
    const topVal = req.params.top,
          skipVal = req.params.skip,
          skip = (isNaN(skipVal)) ? 0 : +skipVal;  
    let top = (isNaN(topVal)) ? 10 : skip + (+topVal);

    if (top > users.length) {
        top = skip + (users.length - skip);
    }

    console.log(`Skip: ${skip} Top: ${top}`);

    var pagedUsers = users.slice(skip, top);
    res.setHeader('X-InlineCount', users.length);
    res.json(pagedUsers);
});

app.get('/api/users', (req, res) => {
    res.json(users);
});

app.get('/api/users/:id', (req, res) => {
    let userId = +req.params.id;
    let selectedUser = {};
    for (let user of users) {
        if (user.id === userId) {
           selectedUser = user;
           break;
        }
    }  
    res.json(selectedUser);
});

app.post('/api/users', (req, res) => {
    let postedUser = req.body;
    let maxId = Math.max.apply(Math,users.map((cust) => cust.id));
    postedUser.id = ++maxId;
    postedUser.gender = (postedUser.id % 2 === 0) ? 'female' : 'male';
    users.push(postedUser);
    res.json(postedUser);
});

app.put('/api/users/:id', (req, res) => {
    let putUser = req.body;
    let id = +req.params.id;
    let status = false;

    //Ensure state name is in sync with state abbreviation 
    const filteredStates = states.filter((state) => state.abbreviation === putUser.state.abbreviation);
    if (filteredStates && filteredStates.length) {
        putUser.state.name = filteredStates[0].name;
        console.log('Updated putUser state to ' + putUser.state.name);
    }

    for (let i=0,len=users.length;i<len;i++) {
        if (users[i].id === id) {
            users[i] = putUser;
            status = true;
            break;
        }
    }
    res.json({ status: status });
});

app.delete('/api/users/:id', function(req, res) {
    let userId = +req.params.id;
    for (let i=0,len=users.length;i<len;i++) {
        if (users[i].id === userId) {
           users.splice(i,1);
           break;
        }
    }  
    res.json({ status: true });
});

app.get('/api/orders/:id', function(req, res) {
    let userId = +req.params.id;
    for (let cust of users) {
        if (cust.userId === userId) {
            return res.json(cust);
        }
    }
    res.json([]);
});

app.get('/api/states', (req, res) => {
    res.json(states);
});

app.post('/api/auth/login', (req, res) => {
    var userLogin = req.body;
    //Add "real" auth here. Simulating it by returning a simple boolean.
    res.json(true);
});

app.post('/api/auth/logout', (req, res) => {
    res.json(true);
});

// redirect all others to the index (HTML5 history)
app.all('/*', function(req, res) {
    res.sendFile(__dirname + '/src/index.html');
});

app.listen(3000);

console.log('Express listening on port 3000.');

//Open browser
var opn = require('opn');

opn('http://localhost:3000').then(() => {
    console.log('Browser closed.');
});


