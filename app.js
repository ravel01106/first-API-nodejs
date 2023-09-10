const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) =>{
    // req es la request, la peticion
    // res es la response, la respuesta
    console.log(req);
    res.status(200).send('Hello Word!');
});

app.post('/team/pokemons', () => {
    res.status(200).send('Hello Word!');
});

app.get('/team', () => {
    res.status(200).send('Hello Word!');
});

app.delete('/team/pokemons/:pokeid', () =>{
    res.status(200).send('Hello Word!');
});

app.put('/team', () =>{
    res.status(200).send('Hello Word!');
})


app.listen(port, () => {
    console.log('Server started at port 3000');
});
