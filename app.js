/* const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('express-flash');
const fileUpload = require('express-fileupload'); */

import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import flash from "express-flash";
import fileUpload from "express-fileupload";

import rutasPrivadas from "./routes/privadas.js";
import rutasPublicas from "./routes/publicas.js";
import rutasMiddleware from "./routes/middleware.js";

const app = express();
const path = process.env.PORT || 8080;

/* const rutasPrivadas = require('./routes/privadas');
const rutasPublicas = require('./routes/publicas');
const rutasMiddleware = require('./routes/middleware'); */



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

app.listen(path, () => {
    console.log(`Servidor iniciado en el puerto ${path}`)
})