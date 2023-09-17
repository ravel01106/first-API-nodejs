const uuid = require('uuid');
const crypto = require('../crypto');

const userDatabase = {};
// userID -> password(cifrada)

const registerUser = (userName, password) => {
    // Guardar en la base de datos nuestro usuario
    let hashedPwd = crypto.hashPasswordSync(password);
    userDatabase[uuid.v4()] = {
        userName: userName,
        password: hashedPwd
    }
    /* crypto.hashPassword(password, (err, result) => {
        userDatabase[uuid.v4()] = {
            userName: userName,
            password: result
        }
    }) */
    
}

const getUserIdFromUserName = (userName) => {
    for (let user in userDatabase){
        if(userDatabase[user].userName == userName){
            return userDatabase[user];
        }
    }
}

const checkUserCredentials = (userName, password, done) => {
    // Comprobar que las credenciales son correctas
    console.log('Checking user credentials');
    let user = getUserIdFromUserName(userName);
    if(user){
        console.log(user);
        crypto.comparePassword(password, user.password, done);
    }else{
        done('Missing user');
    }
    /*  let user = userDatabase[userId];
    crypto.comparePassword(password, user.password, done); */
}

exports.registerUser = registerUser;
exports.checkUserCredentials = checkUserCredentials;


// Libreria uuid -> npm install -s uuid
// Libreria bcrypt -> npm install -s bcrypt