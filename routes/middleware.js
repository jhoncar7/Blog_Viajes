import express from "express";

const router = express.Router();

router.use('/admin/', (req, res, next) => {
  if (!req.session.usuario) {
    req.flash('mensaje', 'Debe iniciar sesión')
    res.redirect("/inicio")
  }
  else {
    next()
  }
})

export default router;