const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../auth')(passport);

router.route('/')
    .get(passport.authenticate('jwt',{session: false}), // MIDDEL 1
            (req, res) => { // HANDLER
            res.status(200).send('Hello World!');
        }
    )
    .put( () =>{
        res.status(200).send('Hello World!');
    }
);

router.route('/pokemons')
    .post( () => {
        res.status(200).send('Hello World!');
    }
);


router.route('/pokemons/:pokeid')
    .delete(() =>{
        res.status(200).send('Hello World!');
    }
);

exports.router = router;
