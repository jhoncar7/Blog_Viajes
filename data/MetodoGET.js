function publicacionAllAuthor(id) {
    return `SELECT * from publicaciones where autor_id = ${id}`
}

function getEditar(idPublicacion, idUser) {
    return `SELECT * FROM publicaciones WHERE id = ${idPublicacion} AND autor_id = ${idUser}`
}

export default { publicacionAllAuthor, getEditar };