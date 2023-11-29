const mongoose = require('mongoose')
let password = 'pantalla1'
let databaseName = 'db'
mongoose.connect(`mongodb+srv://admin:${password}@prueba.jjuvtzw.mongodb.net/${databaseName}?retryWrites=true&w=majority`)

