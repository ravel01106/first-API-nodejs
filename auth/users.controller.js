const uuid = require('uuid');
const crypto = require('../tools/crypto');
const teams = require('../teams/teams.controller');
const mongoose = require('mongoose');
const { to } = require('../tools/to');
const userModel = mongoose.model('UserModel', { userId: String, userName: String, password: String})


const cleanUpUser = () => {
    return new Promise(async (resolve, reject) => {
        await userModel.deleteMany({}).exec();
        resolve()
    })
}



const registerUser = (userName, password) => {
    return new Promise(async (resolve, reject) => {
        let hashedPwd = crypto.hashPasswordSync(password);
        let userId = uuid.v4();
        // Guardar en la base de datos de mongo nuestro usuario
        let newUser = new userModel({
            userId: userId,
            userName: userName,
            password: hashedPwd
        })
        await newUser.save()
        await teams.bootstrapTeam(userId);
        resolve();
    });
}

const getUserIdFromUserName = (userName) => {
    return new Promise(async (resolve, reject) => {
        let [err, result] = await to(userModel.findOne({userName: userName}).exec())
        if (err){
            return reject('No user found')
        }
        resolve(result);

    })
}

const getUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        let [err, result] = await to(userModel.findOne({userId: userId}).exec())
        if (err){
            return reject('No user found')
        }
        resolve(result);
    });
}

const checkUserCredentials = (userName, password) => {
    return new Promise(async (resolve, reject) => {
        let [err, user] = await to(getUserIdFromUserName(userName));
        if (!err || user) {
            crypto.comparePassword(password, user.password, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        } else {
            reject('Missing user');
        }
    });
}

exports.registerUser = registerUser;
exports.checkUserCredentials = checkUserCredentials;
exports.getUser = getUser;
exports.getUserIdFromUserName = getUserIdFromUserName;
exports.cleanUpUser = cleanUpUser;

// Libreria uuid -> npm install -s uuid
// Libreria bcrypt -> npm install -s bcrypt