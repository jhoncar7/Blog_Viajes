const express = require('express')
const router = express.Router()
const mysql = require('mysql')

const pool = mysql.createPool({
    connectionLimit: 20,
    host: 'localhost',
    user: 'root',
    password: 'Jhoncar12345',
    database: 'blog_viajes'
});

router.get('/admin/index', (req, res) => {
    pool.getConnection((err, connection) => {
        const consulta = `SELECT * from publicaciones where autor_id = ${connection.escape(req.session.usuario.id)}`
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
        const consulta = `
        INSERT INTO
        publicaciones
        (titulo, resumen, contenido, autor_id, fecha_hora)
        VALUES
        (
          ${connection.escape(req.body.titulo)},
          ${connection.escape(req.body.resumen)},
          ${connection.escape(req.body.contenido)},
          ${connection.escape(req.session.usuario.id)},
          ${connection.escape(fecha)}
        )
      `
        connection.query(consulta,  (error, filas, campos) => {
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
      const consulta = `
        SELECT * FROM publicaciones
        WHERE
        id = ${connection.escape(req.params.id)}
        AND
        autor_id = ${connection.escape(req.session.usuario.id)}
      `
      connection.query(consulta, (error, filas, campos) => {
        if (filas.length > 0){
            res.render('admin/editar', {publicacion: filas[0], mensaje: req.flash('mensaje'), usuario: req.session.usuario})
        }
        else{
          req.flash('mensaje', 'Operación no permitida')
          res.redirect("/admin/index")
        }
      })
      connection.release()
    })
  })

  router.post('/admin/procesar_editar', (req, res) => {
    pool.getConnection((err, connection) => {
      const consulta = `
        UPDATE publicaciones
        SET
        titulo = ${connection.escape(req.body.titulo)},
        resumen = ${connection.escape(req.body.resumen)},
        contenido = ${connection.escape(req.body.contenido)}
        WHERE
        id = ${connection.escape(req.body.id)}
        AND
        autor_id = ${connection.escape(req.session.usuario.id)}
      `
      connection.query(consulta, (error, filas, campos) => {
        if (filas && filas.changedRows > 0){
            req.flash('mensaje', 'Publicación editada')
        }
        else{
          req.flash('mensaje', 'Publicación no editada')
        }
        res.redirect("/admin/index")
      })
      connection.release()
    })
  })

  router.get('/admin/procesar_eliminar/:id', (req, res) => {
    pool.getConnection((err, connection) => {
      const consulta = `
        DELETE
        FROM
        publicaciones
        WHERE
        id = ${connection.escape(req.params.id)}
        AND
        autor_id = ${connection.escape(req.session.usuario.id)}
      `
      connection.query(consulta, (error, filas, campos) => {
        if (filas && filas.affectedRows > 0){
            req.flash('mensaje', 'Publicación eliminada')
        }
        else{
          req.flash('mensaje', 'Publicación no eliminada')
        }
        res.redirect("/admin/index")
      })
      connection.release()
    })
  })

module.exports = router