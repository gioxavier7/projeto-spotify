/**
 * objetivo: model responsável pelo CRUD de dados de genero no banco de dados
 * data: 24/04/2025
 * dev: giovanna
 * versão: 1.0
 */

//import da biblioteca Prisma/Client
const { PrismaClient } = require('@prisma/client')

//instanciando (criar um novo objeto) para realizar a manipulação do script SQL
const prisma = new PrismaClient()

//funcao para inserir um genero no bando de dados
const insertGenero = async function(genero){
    try {
        let sql = `insert into tbl_genero(
                                            tipo
                                            )
                                      values(
                                             '${genero.tipo}'
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

//função para atualizar um genero existente no banco de dados
const updateGenero = async function(genero){
    try {
        let sql = `update tbl_genero set tipo= '${genero.tipo}'
                                        where id=${genero.id}`
                        
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

//função para excluir um genero existente no banco de dados
const deleteGenero = async function(id){
    try {
        //script sql
        let sql = 'delete from tbl_genero where id='+id

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

//função para retornar todas as genero do banco de dados
const selectAllGenero = async function(){
    try {
        let sql = 'select * from tbl_genero order by id desc'

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

//função para listar um genero pelo ID no banco de dados
const selectByIdGenero = async function(id){
    try {
        //script sql
        let sql = 'select * from tbl_genero where id='+id

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
    insertGenero,
    updateGenero,
    deleteGenero,
    selectAllGenero,
    selectByIdGenero
}