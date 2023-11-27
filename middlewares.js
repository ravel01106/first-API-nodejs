const authmiddlewares = require('./tools/auth-middleware')
const bodyParser = require('body-parser'); // Plugin de express para poder leer los datos que te llegan en las peticiones de forma correcta

const setupMiddlewares = (app) => {
    app.use(bodyParser.json());
    authmiddlewares.init();
    app.use(authmiddlewares.protectWithJwt);
}
exports.setupMiddlewares = setupMiddlewares;