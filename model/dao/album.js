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

//funcao para inserir um album no bando de dados
const insertAlbum = async function(album){
    try {
        let sql = `insert into tbl_album(
                                            titulo,
                                            data_lancamento,
                                            foto_capa,
                                            duracao,
                                            id_banda
                                            )
                                      values(
                                             '${album.titulo}',
                                             '${album.data_lancamento}',
                                             '${album.foto_capa}',
                                             '${album.duracao}',
                                             '${album.id_banda}'
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

//função para atualizar um album existente no banco de dados
const updateAlbum = async function(album){
    try {
        let sql = `update tbl_album set titulo= '${album.titulo}',
                                            data_lancamento= '${album.data_lancamento}',
                                            foto_capa= '${album.foto_capa}',
                                            duracao= '${album.duracao}'
                                            id_banda= '${album.id_banda}'

                                        where id=${album.id}`
                        
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

//função para excluir um album existente no banco de dados
const deleteAlbum = async function(id){
    try {
        //script sql
        let sql = 'delete from tbl_album where id='+id

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

//função para retornar todas as album do banco de dados
const selectAllAlbum = async function(){
    try {
        let sql = 'select * from tbl_album order by id desc'

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

//função para listar um album pelo ID no banco de dados
const selectByIdAlbum = async function(id){
    try {
        //script sql
        let sql = 'select * from tbl_album where id='+id

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
    insertAlbum,
    updateAlbum,
    deleteAlbum,
    selectAllAlbum,
    selectByIdAlbum
}