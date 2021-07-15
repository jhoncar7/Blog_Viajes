const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('express-flash');
const fileUpload = require('express-fileupload');
const app = express();

const rutasPrivadas = require('./routes/privadas');
const rutasPublicas = require('./routes/publicas');
const rutasMiddleware = require('./routes/middleware');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.set('view engine', 'ejs')
app.use(session({ secret: 'token-muy-secreto', resave: true, saveUninitialized: true }));
app.use(flash());
app.use(express.static('public'))
app.use(fileUpload());

app.use(rutasMiddleware);
app.use(rutasPublicas);
app.use(rutasPrivadas);

app.listen(3000, () => {
    console.log('servidor iniciado')
})