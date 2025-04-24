/**
 * objetivo: model responsável pelo CRUD de dados de planos no banco de dados
 * data: 24/04/2025
 * dev: giovanna
 * versão: 1.0
 */

//import da biblioteca Prisma/Client
const { PrismaClient } = require('@prisma/client')

//instanciando (criar um novo objeto) para realizar a manipulação do script SQL
const prisma = new PrismaClient()

//funcao para inserir um plano no bando de dados
const insertPlano = async function(plano){
    try {
        let sql = `insert into tbl_plano(
                                            nome,
                                            preco,
                                            beneficios
                                            )
                                      values(
                                             '${plano.nome}',
                                             '${plano.preco}',
                                             '${plano.beneficios}'
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

//função para atualizar um plano existente no banco de dados
const updatePlano = async function(plano){
    try {
        let sql = `update tbl_plano set nome= '${plano.nome}',
                                            preco= '${plano.preco}',
                                            beneficios= '${plano.beneficios}'
                                        where id=${plano.id}`
                        
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

//função para excluir um plano existente no banco de dados
const deletePlano = async function(id){
    try {
        //script sql
        let sql = 'delete from tbl_plano where id='+id

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

//função para retornar todas as plano do banco de dados
const selectAllPlano = async function(){
    try {
        let sql = 'select * from tbl_plano order by id desc'

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

//função para listar um plano pelo ID no banco de dados
const selectByIdPlano = async function(id){
    try {
        //script sql
        let sql = 'select * from tbl_plano where id='+id

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
    insertPlano,
    updatePlano,
    deletePlano,
    selectAllPlano,
    selectByIdPlano
}