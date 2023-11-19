const express = require('express');
const bodyParser = require('body-parser'); // Plugin de express para poder leer los datos que te llegan en las peticiones de forma correcta

// Routes
const authRoutes = require('./auth/auth.router').router;
const teamsRoutes = require('./teams/teams.router').router;

const app = express();
app.use(bodyParser.json());

const port = 3000;

app.get('/', (req, res) =>{
    res.status(200).send('Hello World!');
});

app.use('/auth', authRoutes);
app.use('/teams', teamsRoutes);

app.listen(port, () => {
    console.log('Server started at port 3000');
});

exports.app = app;
// TESTING
// Mocha y chai