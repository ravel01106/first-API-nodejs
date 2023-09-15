const express = require('express');
const passport = require('passport');
require('./auth')(passport);

const app = express();
const port = 3000;

app.get('/', (req, res) =>{
    // req es la request, la peticion
    // res es la response, la respuesta
    //console.log(req);
    res.status(200).send('Hello World!');
});

app.post('/login', (req,res) => {
    // Comprobamos credenciales
    // Si no son validas, error
    // Si son validas, generamos un JWT y lo devolvemos
    res.status(200).json(
        {token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.zX5MPQtbjoNAS7rpsx_hI7gqGIlXOQq758dIqyBVxxY'}
    );
})
/* USER -> MIDDEL 1 -> MIDDEL 2 -> ... -> N -> HANDLER*/

app.post('/team/pokemons', () => {
    res.status(200).send('Hello World!');
});

app.get('/team', 
    passport.authenticate('jwt',{session: false}), // MIDDEL 1
    (req, res) => { // HANDLER
        res.status(200).send('Hello World!');
    }
);

app.delete('/team/pokemons/:pokeid', () =>{
    res.status(200).send('Hello World!');
});

app.put('/team', () =>{
    res.status(200).send('Hello World!');
})


app.listen(port, () => {
    console.log('Server started at port 3000');
});

exports.app = app;
// TESTING
// Mocha y chai