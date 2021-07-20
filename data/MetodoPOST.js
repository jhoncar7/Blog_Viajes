function addPublicacion(titulo, resumen, contenido, idUser, fecha) {
    return `INSERT INTO publicaciones (titulo, resumen, contenido, autor_id, fecha_hora) VALUES (${titulo},${resumen},${contenido},${idUser},${fecha})`
}

function editarUpdate(titulo, resumen, contenido, idPublicacion, idUser){
    return `
    UPDATE publicaciones
    SET
    titulo = ${titulo},
    resumen = ${cresumen},
    contenido = ${ccontenido}
    WHERE
    id = ${idPublicacion}
    AND
    autor_id = ${idUser}
  `
}

export default {addPublicacion, editarUpdate}