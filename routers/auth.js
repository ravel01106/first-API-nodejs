const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Controllers
const usersController = require('../controllers/users');
usersController.registerUser('bettatech', '1234');
usersController.registerUser('admin', '4321');

router.route('/')
    .get((req, res) => {
        res.send('GET Auth router');
    })
    .post((req, res) => {
        res.send('POST Auth router');
    });

router.route('/login')
    .post((req, res) => {
        if(!req.body){
            return res.status(400).json({message: 'Missing data'});
        }else if(!req.body.user || !req.body.password){
            return res.status(400).json({message: 'Missing data'});
        }
    
        // Comprobamos credenciales
        usersController.checkUserCredentials(req.body.user, req.body.password, (err, result) => {
    
            // Si no son validas, error
            if(err || !result){
                return res.status(401).json({message: 'Invalid credentials.'})
            }
    
            // Si son validas, generamos un JWT y lo devolvemos
            let user = usersController.getUserIdFromUserName(req.body.user);
            const token = jwt.sign({userId: user.userId}, 'secretPassword');
            res.status(200).json(
                {token: token}
            );
            /*
            res.status(200).json(
                {token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.zX5MPQtbjoNAS7rpsx_hI7gqGIlXOQq758dIqyBVxxY'}
            ); 
            */
        });
    });

exports.router = router;