/**
 * objetivo: model responsável pelo CRUD de dados de artistas no banco de dados
 * data: 17/04/2025
 * dev: giovanna
 * versão: 1.0
 */

//import da biblioteca Prisma/Client
const { PrismaClient } = require('@prisma/client')

//instanciando (criar um novo objeto) para realizar a manipulação do script SQL
const prisma = new PrismaClient()

//função para inserir um novo artista no banco de dados
const insertArtista = async function(artista){
    try {
        let sql = `insert into tbl_artista(
                                            nome,
                                            biografia
                                            )
                                      values(
                                             '${artista.nome}',
                                             '${artista.biografia}'
                                             )`
                                             
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

//função para atualizar um artista existente no banco de dados
const updateArtista = async function(artista){
    try {
        let sql = `update tbl_artista set nome= '${artista.nome}',
                                            biografia= '${artista.biografia}'
                                        where id=${artista.id}`
                        
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}


//função para excluir uma artista existente no banco de dados
const deleteArtista = async function(id){
    try {
        //script sql
        let sql = 'delete from tbl_artista where id='+id

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

//função para retornar todos os artistas do banco de dados
const selectAllArtista = async function(){
    try {
        let sql = 'select * from tbl_artista order by id desc'

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

//função para listar um artista pelo ID no banco de dados
const selectByIdArtista = async function(id){
    try {
        //script sql
        let sql = 'select * from tbl_artista where id='+id

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
    insertArtista,
    updateArtista,
    deleteArtista,
    selectAllArtista,
    selectByIdArtista
}