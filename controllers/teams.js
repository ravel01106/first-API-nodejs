let teamsDatabase = {};

const cleanUpTeam = () => {
    for (let user in teamsDatabase) {
        teamsDatabase[user] = []
    }
}

const bootstrapTeam = (userId) =>{
    teamsDatabase[userId] = []
}
const addPokemon = (userId, pokemon) => {
    teamsDatabase[userId].push(pokemon);
}

const getTeamOfUser = (userId) => {
    return teamsDatabase[userId];
}

const setTeam = (userId, team) => {
    teamsDatabase[userId] = team;
}

const deletePokemonAt = (userId, pokeId) => {
    console.log('DELETE ', userId, pokeId);
    if (teamsDatabase[userId][pokeId]){
        teamsDatabase[userId].splice(pokeId, 1);
    }
}

exports.bootstrapTeam = bootstrapTeam;
exports.addPokemon = addPokemon;
exports.setTeam = setTeam;
exports.getTeamOfUser = getTeamOfUser;
exports.cleanUpTeam = cleanUpTeam;
exports.deletePokemonAt = deletePokemonAt;