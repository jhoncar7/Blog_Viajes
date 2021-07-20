import express from "express";
import path from "path";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import pool from "../data/connection.js";

dotenv.config();
const router = express.Router()

const transporter = nodemailer.createTransport({
    service: process.env.SERVICE,
    auth:{
        user: process.env.USER_EMAIL,
        pass: process.env.PASSWORD_EMAIL
    }
})

function enviarCorreoBienvenida(email,nombre){
    const opciones = {
        from : process.env.USER_EMAIL,
        to : email,
        subject : 'Bienvenido al blog e viaje',
        text: `Te damos la bienvenida ${nombre}`
    }
    transporter.sendMail(opciones,(error,info)=>{
        if(error){
            console.log(error);
        }else{
            console.log(info);
        }
    })
}

router.get('/', (req, res) => {
    pool.getConnection(function (err, connection) {
        /* const consulta = `SELECT titulo, resumen, fecha_hora, pseudonimo, votos FROM publicaciones
        INNER JOIN autores ON publicaciones.autor_id = autores.id
        ORDER BY fecha_hora DESC LIMIT 5`  */

        let consulta;
        let modificadorConsulta = "";
        let modificarPagina = "";
        let pagina = 0;
        let busqueda = (req.query.busqueda) ? req.query.busqueda : "";

        if (busqueda != "") {
            modificadorConsulta = `where titulo LIKE '%${busqueda}%' OR
                                        resumen LIKE '%${busqueda}%' OR
                                        contenido LIKE '%${busqueda}%'`
            modificarPagina = "";
        } else {
            pagina = (req.query.pagina) ? parseInt(req.query.pagina) : 0;
            if (pagina < 0) {
                pagina = 0;
            }
            modificarPagina = `LIMIT 5 OFFSET ${pagina * 5}`
        }

        consulta = `SELECT publicaciones.id id,titulo, resumen, fecha_hora, pseudonimo, votos, avatar 
        FROM publicaciones
        INNER JOIN autores ON publicaciones.autor_id = autores.id
        ${modificadorConsulta} ORDER BY fecha_hora ${modificarPagina}`

        connection.query(consulta, (error, filas, campos) => {
            res.render('index', { publicaciones: filas, busqueda: busqueda, pagina: pagina })
        })
        connection.release()
    })
})

router.get('/registro', (req, res) => {
    res.render('registro', { mensaje: req.flash('mensaje') })
})

router.post('/procesar_registro', (req, res) => {

    pool.getConnection((err, connection) => {

        const email = req.body.email.toLowerCase().trim();
        const pseudonimo = req.body.pseudonimo.trim();
        const contrasena = req.body.contrasena;

        const consultaEmail = `select * from autores where email=${connection.escape(email)}`

        connection.query(consultaEmail, (error, filas, campos) => {
            if (filas.length > 0) {
                req.flash('mensaje', 'Email duplicado')
                res.redirect('/registro')
            } else {
                const consultaPseudonimo = `select * from autores where pseudonimo=${connection.escape(pseudonimo)}`
                connection.query(consultaPseudonimo, (error, filas, campos) => {
                    if (filas.length > 0) {
                        req.flash('mensaje', 'Pseudonimo duplicado')
                        res.redirect('/registro')
                    } else {
                        const consulta = `INSERT INTO autores(email,contrasena,pseudonimo) VALUES(
                            ${connection.escape(email)},${connection.escape(contrasena)},${connection.escape(pseudonimo)}
                        )`

                        connection.query(consulta, (error, filas, campos) => {
                            if (req.files && req.files.avatar) {
                                let archivoAvatar = req.files.avatar;
                                const id = filas.insertId;
                                const nombreArchivo =  `${id}${path.extname(archivoAvatar.name)}`
                                archivoAvatar.mv(`./public/avatars/${nombreArchivo}`,(error)=>{
                                    const consultaAvatar = `UPDATE autores SET avatar = ${connection.escape(nombreArchivo)}
                                    where id = ${connection.escape(id)}`
                                    connection.query(consultaAvatar,(error,filas,campos)=>{
                                        enviarCorreoBienvenida(email,pseudonimo)
                                        req.flash('mensaje','Usuario registrado con avatar')
                                        res.redirect('/registro')
                                    })
                                })
                            } else {
                                enviarCorreoBienvenida(email,pseudonimo)
                                req.flash('mensaje', 'Usuario registrado')
                                res.redirect('/registro')
                            }
                        })
                    }
                })
            }
        })
        connection.release();
    })
})


router.get('/inicio', (req, res) => {
    res.render('inicio', { mensaje: req.flash('mensaje') })
})

router.post('/procesar_inicio', (req, res) => {
    pool.getConnection((err, connection) => {
        const consulta = `
          SELECT *
          FROM autores
          WHERE
          email = ${connection.escape(req.body.email)} AND
          contrasena = ${connection.escape(req.body.contrasena)}
        `
        connection.query(consulta, (error, filas, campos) => {
            if (filas.length > 0) {
                //console.log(req.session.usuario);
                req.session.usuario = filas[0]
                res.redirect('/admin/index')
            }
            else {
                req.flash('mensaje', 'Datos inválidos')
                res.redirect('/inicio')
            }

        })
        connection.release()
    })
})


router.get('/publicacion/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        const consulta = `
        SELECT *
        FROM publicaciones
        WHERE id = ${connection.escape(req.params.id)}
      `
        connection.query(consulta, (error, filas, campos) => {
            if (filas.length > 0) {
                res.render('publicacion', { publicacion: filas[0] })
            }
            else {
                res.redirect('/')
            }
        })
        connection.release()
    })
})



router.get('/autores',(req,res)=>{
    pool.getConnection((err,connection)=>{
        const consulta = `SELECT autores.id id, pseudonimo, avatar, publicaciones.id publicacion_id, titulo
        FROM autores
        INNER JOIN
        publicaciones
        ON
        autores.id = publicaciones.autor_id
        ORDER BY autores.id DESC, publicaciones.fecha_hora DESC`;

        connection.query(consulta, (error, filas, campos) => {
            autores = []
            ultimoAutorId = undefined
            filas.forEach(registro => {
              if (registro.id != ultimoAutorId){
                ultimoAutorId = registro.id
                autores.push({
                  id: registro.id,
                  pseudonimo: registro.pseudonimo,
                  avatar: registro.avatar,
                  publicaciones: []
                })
              }
              autores[autores.length-1].publicaciones.push({
                id: registro.publicacion_id,
                titulo: registro.titulo
              })
            });
            res.render('autores', { autores: autores })
          })
        connection.release();
    })
})

router.get('/publicacion/:id/votar',(req,res)=>{
    pool.getConnection((err,connection)=>{
        const consulta = `select * from publicaciones where id = ${connection.escape(req.params.id)}`;

        connection.query(consulta,(error,filas,campos)=>{
            if(filas.length>0){
                const consultaVoto = ` update publicaciones set votos = votos+1
                where id = ${connection.escape(req.params.id)}`

                connection.query(consultaVoto,(error,filas,campos)=>{
                    res.redirect(`/publicacion/${req.params.id}`)
                })
            }else {
                req.flash('mensaje','Publicacion invalida')
                req.redirect('/')
            }
        })
        connection.release();
    })
})

export default router;