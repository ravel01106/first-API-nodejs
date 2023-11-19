const chai = require('chai');
const chaiHttp = require('chai-http');
const usersController = require("../controllers/users");

chai.use(chaiHttp); 

const app = require('../app').app;

before((done) => {
    usersController.registerUser('bettatech', '1234');
    usersController.registerUser('admin', '4321');
    done();
})

describe('Suite de pruebas auth', () => {

    it('should return 401 when no jwt token available', (done) => { 
        // Cuando la llamada no tiene correctamente la llave
        chai.request(app).get('/teams').end((err, res) => {
            chai.assert.equal(res.statusCode, 401);
            done();
        })
    });

    it('should return 400 when no data is provided', (done) => {
        chai.request(app)
            .post('/auth/login')
            .end((err, res) => {
                // Expect valid login
                chai.assert.equal(res.statusCode, 400);
                done();
            });
    });

    it('should return 200 and token for succesful login', (done) => {
        chai.request(app)
            .post('/auth/login')
            .set('content-type', 'application/json')
            .send({user: 'bettatech', password: '1234'})
            .end((err, res) => {
                // Expect valid login
                chai.assert.equal(res.statusCode, 200);
                done();
            });
    });

    it('should return 200 when jwt token is valid', (done) => { 
        chai.request(app)
            .post('/auth/login')
            .set('content-type', 'application/json')
            .send({user: 'bettatech', password: '1234'})
            .end((err, res) => {
                // Expect valid login
                chai.assert.equal(res.statusCode, 200);
                chai.request(app)
                    .get('/teams')
                    .set('Authorization', `JWT ${res.body.token}`)
                    .end((err, res) => {
                        chai.assert.equal(res.statusCode, 200);
                        done();
                    });

            });

        
    });
});

after((done) => {
    usersController.cleanUpUser();
    done();
})


/**
 * Passportjs = Passport es una libreria de NodeJS que se usa principalmente para la autentificacion sobre todo para NodeJS y Express
 * Es muy extensible. Dentro de la pagina existe un concepto / opcion de estrategias permite implementar autenticación, registros, 
 * todo el sistema de login... Que nos ayuda a implentar todo un completo y complejo sistema de registros
 * 
 * JWT = JSON Web Token es un sistema que nos permite codificar informacion de usuario en un String siendo el objetivo que, cuando un usuario se registre,
 * nosotros podemos enviarle al Usuario, siendo un texto cifrado con información del Usuario, para que lo pueda usar para autentificarse.
 * Este texto cifrado esta protegido por una contraseña que solo tiene el servidor donde se comprobara si es valido o no.
 * */