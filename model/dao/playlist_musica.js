/*******************************************************************************************************
 * Objetivo: Criar a comunicação com o Banco de Dados para fazer o CRUD de playlist musica
 * Data: 15/05/2025
 * Autor: giovanna
 * Versão: 1.0
 ******************************************************************************************************/
//import da biblioteca do prisma client para executar os scripts SQL
const { PrismaClient } = require('@prisma/client')

//Instancia (criar um objeto a ser utilizado) a biblioteca do prisma/client
const prisma = new PrismaClient()

//Função para inserir um novo PlaylistMusica
const insertPlaylistMusica = async function(PlaylistMusica){
  try {

      let sql = `insert into tbl_playlist_musica  ( 
                                          id_playlist,
                                          id_musica
                                        ) 
                                          values 
                                        (
                                          ${PlaylistMusica.id_playlist},
                                          ${PlaylistMusica.id_musica}
                                        )`
      //console.log(sql)

      //Executa o scriptSQL no banco de dados e aguarda o retorno do BD para 
      //saber se deu certo                                  
      let result = await prisma.$executeRawUnsafe(sql)

      if(result)
          return true
      else
          return false
  } catch (error) {
      
      return false
  }
}

//Função para atualizar um PlaylistMusica existente
const updatePlaylistMusica = async function(PlaylistMusica){
  try {
      let sql = `update tbl_playlist_musica set     id_playlist       = ${PlaylistMusica.id_playlist},
                                                    id_musica      = ${PlaylistMusica.id_musica}
                                        
                            where id = ${PlaylistMusica.id}                
                            `
      let resultPlaylistMusica = await prisma.$executeRawUnsafe(sql)

      if(resultPlaylistMusica)
        return true
      else
        return false
  } catch (error) {
    return false
  }
}

//Função para excluir um PlaylistMusica existente
const deletePlaylistMusica = async function(id){
  try {
    let sql = `delete from tbl_playlist_musica where id = ${id}`

    let result = await prisma.$executeRawUnsafe(sql)

    if (result)
      return true
    else 
      return false
  } catch (error) {
    return false
  }
}

//Função para retornar todos os PlaylistMusicas existentes
const selectAllPlaylistMusica = async function(){

    try {
      //ScriptSQL para retornar todos os dados
      let sql = 'select * from tbl_playlist_musica order by id desc'

      //Executa o scriptSQL no BD e aguarda o retorno dos dados
      let result = await prisma.$queryRawUnsafe(sql)

      if(result)
        return result
      else
        return false

    } catch (error) {
      return false
    }
}

//Função para buscar um PlaylistMusica pelo ID
const selectByIdPlaylistMusica = async function(id){
  try {
    let sql = `select * from tbl_playlist_musica where id = ${id}`

    let result = await prisma.$queryRawUnsafe(sql)

    if (result)
      return result
    else 
      return false
  } catch (error) {
    return false
  }
}

//Função para retornar os dados do genero filtrando pelo Filme
const selectPlaylistByIdMusica = async function(idMuscia){
  try {
      let sql = `select tbl_playlist.* from tbl_musica
                          inner join tbl_playlist_musica
                            on tbl_musica.id = tbl_playlist_musica.id_musica
                          inner join tbl_playlist
                            on tbl_playlist.id = tbl_playlist_musica.id_playlist
                      where tbl_musica.id = ${idMuscia}`

      let result = await prisma.$queryRawUnsafe(sql)

      if (result)
        return result
      else 
        return false
  } catch (error) {
      return false
  }
}

//Função para retornar os dados do filme filtrando pelo Genero
const selectMusicaByIdPlaylist = async function(idplaylist){
  try {
      let sql = `select tbl_musica.* from tbl_musica 
                          inner join tbl_playlist_musica
                            on tbl_musica.id = tbl_playlist_musica.id_musica
                          inner join tbl_playlist
                            on tbl_playlist.id = tbl_playlist_musica.id_playlist
                      where tbl_playlist.id = ${idplaylist}`

      let result = await prisma.$queryRawUnsafe(sql)

      if (result)
        return result
      else 
        return false
  } catch (error) {
      return false
  }
}




module.exports = {
    insertPlaylistMusica,
    updatePlaylistMusica,
    deletePlaylistMusica,
    selectAllPlaylistMusica,
    selectByIdPlaylistMusica,
    selectMusicaByIdPlaylist,
    selectPlaylistByIdMusica
} 