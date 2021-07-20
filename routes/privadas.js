import express from "express";
import dotenv from "dotenv";
import pool from "../data/connection.js";
import metodoGet from "../data/MetodoGET.js";
import metodoPost from "../data/MetodoPOST.js";
import MetodoGET from "../data/MetodoGET.js";
import MetodoDelete from "../data/MetodoDelete.js";

dotenv.config();
const router = express.Router()

router.get('/admin/index', async (req, res) => {
  pool.getConnection((err, connection) => {
    const consulta = metodoGet.publicacionAllAuthor(req.session.usuario.id);
    connection.query(consulta, (error, filas, campos) => {
      res.render('admin/index', { usuario: req.session.usuario, mensaje: req.flash('mensaje'), publicaciones: filas })
    })
    connection.release();
  })

})

router.get('/admin/agregar', (req, res) => {
  res.render('admin/agregar', { usuario: req.session.usuario, mensaje: req.flash('mensaje') })
})

router.post('/admin/procesar_agregar', (req, res) => {
  pool.getConnection((err, connection) => {
    const date = new Date()
    const fecha = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    const consulta = metodoPost.addPublicacion(connection.escape(req.body.titulo), connection.escape(req.body.resumen), connection.escape(req.body.contenido), connection.escape(req.session.usuario.id), connection.escape(fecha))
    connection.query(consulta, (error, filas, campos) => {
      req.flash('mensaje', 'Publicación agregada')
      res.redirect("/admin/index")
    })
    connection.release()
  })
})

router.get('/procesar_cerrar_sesion', (req, res) => {
  req.session.destroy();
  res.redirect('/')
})

router.get('/admin/editar/:id', (req, res) => {
  pool.getConnection((err, connection) => {
    const consulta = MetodoGET.getEditar(connection.escape(req.params.id),connection.escape(req.session.usuario.id)) 
    connection.query(consulta, (error, filas, campos) => {
      if (filas.length > 0) {
        res.render('admin/editar', { publicacion: filas[0], mensaje: req.flash('mensaje'), usuario: req.session.usuario })
      }
      else {
        req.flash('mensaje', 'Operación no permitida')
        res.redirect("/admin/index")
      }
    })
    connection.release()
  })
})

router.post('/admin/procesar_editar', (req, res) => {
  pool.getConnection((err, connection) => {
    const consulta = metodoPost.editarUpdate(
      connection.escape(req.body.titulo),
      connection.escape(req.body.resumen),
      connection.escape(req.body.contenido),
      connection.escape(req.body.id),
      connection.escape(req.session.usuario.id)
    )
    connection.query(consulta, (error, filas, campos) => {
      if (filas && filas.changedRows > 0) {
        req.flash('mensaje', 'Publicación editada')
      }
      else {
        req.flash('mensaje', 'Publicación no editada')
      }
      res.redirect("/admin/index")
    })
    connection.release()
  })
})

router.get('/admin/procesar_eliminar/:id', (req, res) => {
  pool.getConnection((err, connection) => {
    const consulta = MetodoDelete.eliminarPublicacion(connection.escape(req.params.id), connection.escape(req.session.usuario.id))
    connection.query(consulta, (error, filas, campos) => {
      if (filas && filas.affectedRows > 0) {
        req.flash('mensaje', 'Publicación eliminada')
      }
      else {
        req.flash('mensaje', 'Publicación no eliminada')
      }
      res.redirect("/admin/index")
    })
    connection.release()
  })
})

export default router;