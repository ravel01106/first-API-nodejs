const express = require('express');
const router = express.Router();
const teamHttpHandler = require('./teams.http')

router.route('/')
    .get(teamHttpHandler.getTeamFromUser)
    .put(teamHttpHandler.setTeamToUser);

router.route('/pokemons')
    .post(teamHttpHandler.addPokemonToTeam);


router.route('/pokemons/:pokeid')
    .delete(teamHttpHandler.deletePokemonFromTeam);

exports.router = router;
