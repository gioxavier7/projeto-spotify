/**
 * objetivo: model responsável pelo CRUD de dados da data de vigencia no banco de dados
 * data: 24/04/2025
 * dev: giovanna
 * versão: 1.0
 */

//import da biblioteca Prisma/Client
const { PrismaClient } = require('@prisma/client')

//instanciando (criar um novo objeto) para realizar a manipulação do script SQL
const prisma = new PrismaClient()

//funcao para inserir uma data vigencia no bando de dados
const insertDataVigencia = async function(dataVigencia){
    try {
        let sql = `insert into tbl_data_vigencia(
                                            data_inicio,
                                            data_termino
                                            )
                                      values(
                                             '${dataVigencia.data_inicio}',
                                             '${dataVigencia.data_termino}'
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

//função para atualizar uma data vigencia existente no banco de dados
const updateDataVigencia = async function(dataVigencia){
    try {
        let sql = `update tbl_data_vigencia set data_inicio= '${dataVigencia.data_inicio}',
                                                data_termino= '${dataVigencia.data_termino}'
                                        where id=${dataVigencia.id}`
                        
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

//função para excluir uma data vigencia existente no banco de dados
const deleteDataVigencia = async function(id){
    try {
        //script sql
        let sql = 'delete from tbl_data_vigencia where id='+id
        
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

//função para retornar todas as datas vigencias do banco de dados
const selectAllDataVigencia = async function(){
    try {
        // script SQL
        let sql = 'select * from tbl_data_vigencia order by id desc'

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

//função para listar uma música pelo ID no banco de dados
const selectByIdDataVigencia = async function(id){
    try {
        //script sql
        let sql = 'select * from tbl_data_vigencia where id='+id

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
    insertDataVigencia,
    updateDataVigencia,
    deleteDataVigencia,
    selectAllDataVigencia,
    selectByIdDataVigencia
}