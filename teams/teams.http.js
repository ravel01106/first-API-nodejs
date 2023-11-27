const teamsController = require('./teams.controller');
const { getUser } = require('../auth/users.controller');
const axios = require('axios').default;

const getTeamFromUser = (req, res) => {
    let user = getUser(req.user.userId);
    res.status(200).json({
        trainer: user.userName,
        team: teamsController.getTeamOfUser(req.user.userId)
    });

}

const setTeamToUser = (req, res) =>{
    teamsController.setTeam(req.user.userId, req.body.team);
    res.status(200).send();
    
}

const addPokemonToTeam = (req, res) => {
    let pokemonName = req.body.name;
    // axios = sirve para hacer llamadas HTTP a servidores -> npm install -S axios
    //console.log("calling pokeapi...")
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then( (response) => {
            let pokemon = {
                name: pokemonName, 
                pokedexNumber: response.data.id
            }
            teamsController.addPokemon(req.user.userId, pokemon);
            res.status(201).send();
        })
        .catch((error) => {
            res.status(400).json({message: error});
        })
    
}

const deletePokemonFromTeam = (req, res) =>{
    teamsController.deletePokemonAt(req.user.userId, req.params.pokeid);
    res.status(200).send();
}


exports.getTeamFromUser = getTeamFromUser;
exports.setTeamToUser = setTeamToUser
exports.addPokemonToTeam = addPokemonToTeam;
exports.deletePokemonFromTeam = deletePokemonFromTeam;