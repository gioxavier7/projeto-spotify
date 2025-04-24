/**
 * objetivo: model responsável pelo CRUD de dados de bandas no banco de dados
 * data: 24/04/2025
 * dev: giovanna
 * versão: 1.0
 */

//import da biblioteca Prisma/Client
const { PrismaClient } = require('@prisma/client')

//instanciando (criar um novo objeto) para realizar a manipulação do script SQL
const prisma = new PrismaClient()

//funcao para inserir uma banda no bando de dados
const insertBanda = async function(banda){
    try {
        let sql = `insert into tbl_banda(
                                            nome,
                                            integrantes
                                            )
                                      values(
                                             '${banda.nome}',
                                             '${banda.integrantes}'
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

//função para atualizar uma banda existente no banco de dados
const updateBanda = async function(banda){
    try {
        let sql = `update tbl_banda set nome= '${banda.nome}',
                                            integrantes= '${banda.integrantes}'
                                        where id=${banda.id}`
                        
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

//função para excluir uma banda existente no banco de dados
const deleteBanda = async function(id){
    try {
        //script sql
        let sql = 'delete from tbl_banda where id='+id

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

//função para retornar todas as bandas do banco de dados
const selectAllBanda = async function(){
    try {
        let sql = 'select * from tbl_banda order by id desc'

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

//função para listar uma banda pelo ID no banco de dados
const selectByIdBanda = async function(id){
    try {
        //script sql
        let sql = 'select * from tbl_banda where id='+id

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
    insertBanda,
    updateBanda,
    deleteBanda,
    selectAllBanda,
    selectByIdBanda
}