function eliminarPublicacion(idPublicacion, idUser){
    return `DELETE FROM publicaciones
            WHERE id = ${idPublicacion} AND
            autor_id = ${idUser}`
}

export default {eliminarPublicacion}