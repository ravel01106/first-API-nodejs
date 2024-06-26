const chai = require('chai');
const chaiHttp = require('chai-http');
const usersController = require("../../auth/users.controller");
const teamsController = require('../teams.controller')

chai.use(chaiHttp);
const app = require('../../app').app;

beforeEach(async () => {
    await usersController.registerUser('bettatech', '1234');
    await usersController.registerUser('admin', '4321');
})

afterEach(async () => {
    await teamsController.cleanUpTeam();
    await usersController.cleanUpUser();
})
describe('Suite de pruebas teams', () => {
    it('should return the team of the given user', (done) => {
        let team = [{name: "Charizard"}, {name: "Blastoise"}]
        // Cuando la llamada no tiene correctamente la llave
        chai.request(app)
        .post('/auth/login')
        .set('content-type', 'application/json')
        .send({user: 'admin', password: '4321'})
        .end((err, res) => {
            let token = res.body.token
            // Expect valid login
            chai.assert.equal(res.statusCode, 200);
            chai.request(app)
            .put('/teams')
            .send({team: team})
            .set('Authorization', `JWT ${token}`)
            .end((err, res) => {
                chai.request(app)
                    .get('/teams')
                    .set('Authorization', `JWT ${token}`)
                    .end((err, res) => {
                        // tiene equipo con Charizard y Blastoise
                        // {trainer: 'bettatech', team: [Pokemon]}
                        chai.assert.equal(res.statusCode, 200);
                        chai.assert.equal(res.body.trainer, 'admin');
                        chai.assert(res.body.team.length, team.length);
                        chai.assert(res.body.team[0].name, team[0].name);
                        chai.assert(res.body.team[1].name, team[1].name);
                        done();
                });
            });

        });
    });

    it('should return the pokedex number', (done) => {
        let pokemonName = 'bulbasaur';
        let pokedexNumber = '1';
        chai.request(app)
        .post('/auth/login')
        .set('content-type', 'application/json')
        .send({user: 'admin', password: '4321'})
        .end((err, res) => {
            let token = res.body.token;
            chai.assert.equal(res.statusCode, 200);
            chai.request(app)
            .post('/teams/pokemons')
            .send({name: pokemonName, pokedexNumber: pokedexNumber})
            .set('Authorization', `JWT ${token}`)
            .end((err, res) => {
                chai.request(app)
                    .get('/teams')
                    .set('Authorization', `JWT ${token}`)
                    .end((err, res) => {
                        chai.assert.equal(res.statusCode, 200);
                        chai.assert.equal(res.body.trainer, 'admin');
                        chai.assert(res.body.team.length, 1);
                        chai.assert(res.body.team[0].name, pokemonName);
                        chai.assert(res.body.team[0].pokedexNumber, pokedexNumber);
                        done();
                });
            });
        });
    });
    
    it('should delete one pokemon by id', (done) => {
        let team = [{name: 'charizard'}, {name: 'bulbasaur'}, {name: 'Pikachu'}]
        chai.request(app)
        .post('/auth/login')
        .set('content-type', 'application/json')
        .send({user: 'admin', password: '4321'})
        .end((err, res) => {
            let token = res.body.token;
            chai.assert.equal(res.statusCode, 200);
            chai.request(app)
            .put('/teams')
            .send({team: team})
            .set('Authorization', `JWT ${token}`)
            .end((err, res) => {
                chai.request(app)
                .delete('/teams/pokemons/1')
                .set('Authorization', `JWT ${token}`)
                .end((err, res) => {
                    chai.request(app)
                    .get('/teams')
                    .set('Authorization', `JWT ${token}`)
                    .end((err, res) => {
                        chai.assert.equal(res.statusCode, 200);
                        chai.assert.equal(res.body.trainer, 'admin');
                        chai.assert(res.body.team.length, team.length - 1);
                        done();
                });
                })
            });
        });
    }); 

    it('should not be able to add pokemon if you already have 6', (done) => {
        let team = [
            {name: "Charizard"}, 
            {name: "Blastoise"},
            {name: "Pikachu"}, 
            {name: "Charizard"}, 
            {name: "Blastoise"},
            {name: "Pikachu"}
        ]
        chai.request(app)
        .post('/auth/login')
        .set('content-type', 'application/json')
        .send({user: 'admin', password: '4321'})
        .end((err, res) => {
            let token = res.body.token;
            chai.assert.equal(res.statusCode, 200);
            chai.request(app)
            .put('/teams')
            .send({team: team})
            .set('Authorization', `JWT ${token}`)
            .end((err, res) => {
                chai.request(app)
                .post('/teams/pokemons')
                .send({name: 'Vibrava'})
                .set('Authorization', `JWT ${token}`)
                .end((err, res) => {
                    chai.assert.equal(res.statusCode, 400);
                    done();
                });
            });
        });
    });

});