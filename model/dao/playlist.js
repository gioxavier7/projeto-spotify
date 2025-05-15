/**
 * objetivo: model responsável pelo CRUD de dados de playlist no banco de dados
 * data: 24/04/2025
 * dev: giovanna
 * versão: 1.0
 */

//import da biblioteca Prisma/Client
const { PrismaClient } = require('@prisma/client')

//instanciando (criar um novo objeto) para realizar a manipulação do script SQL
const prisma = new PrismaClient()

//funcao para inserir um playlist no bando de dados
const insertPlaylist = async function(playlist){
    try {
        let sql = `insert into tbl_playlist(
                                            titulo,
                                            descricao,
                                            id_usuario
                                            )
                                      values(
                                             '${playlist.titulo}',
                                             '${playlist.descricao}',
                                             '${playlist.id_usuario}'
                                             )`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
        return false

    } catch (error) {
        console.log(error);
        
        return false
    }
}

//função para atualizar um Playlist existente no banco de dados
const updatePlaylist = async function(playlist){
    try {
        let sql = `update tbl_playlist set titulo= '${playlist.titulo}',
                                            descricao= '${playlist.descricao}',
                                            id_usuario= '${playlist.id_usuario}'
                                        where id=${playlist.id}`
                        
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

//função para excluir um Playlist existente no banco de dados
const deletePlaylist = async function(id){
    try {
        //script sql
        let sql = 'delete from tbl_playlist where id='+id

        //executa o script
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

//função para retornar todas as Playlist do banco de dados
const selectAllPlaylist = async function(){
    try {
        let sql = 'select * from tbl_playlist order by id desc'

        //executa o script sql no db e aguarda o retorno dos dados
        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

//função para listar um Playlist pelo ID no banco de dados
const selectByIdPlaylist = async function(id){
    try {
        //script sql
        let sql = 'select * from tbl_playlist where id='+id

        //executa o script
        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

module.exports = {
    insertPlaylist,
    updatePlaylist,
    deletePlaylist,
    selectAllPlaylist,
    selectByIdPlaylist
}