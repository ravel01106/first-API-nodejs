const express = require('express');
const bodyParser = require('body-parser'); // Plugin de express para poder leer los datos que te llegan en las peticiones de forma correcta

// Routes
const authRoutes = require('./routers/auth').router;
const teamsRoutes = require('./routers/teams').router;

const app = express();
app.use(bodyParser.json());

const port = 3000;

app.get('/', (req, res) =>{
    // req es la request, la peticion
    // res es la response, la respuesta
    //console.log(req);
    res.status(200).send('Hello World!');
});

app.use('/auth', authRoutes);
/* USER -> MIDDEL 1 -> MIDDEL 2 -> ... -> N -> HANDLER*/
app.use('/teams', teamsRoutes);

app.listen(port, () => {
    console.log('Server started at port 3000');
});

exports.app = app;
// TESTING
// Mocha y chai