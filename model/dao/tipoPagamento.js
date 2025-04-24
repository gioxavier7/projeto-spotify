/**
 * objetivo: model responsável pelo CRUD de dados de tipo de pagamento no banco de dados
 * data: 24/04/2025
 * dev: giovanna
 * versão: 1.0
 */

//import da biblioteca Prisma/Client
const { PrismaClient } = require('@prisma/client')

//instanciando (criar um novo objeto) para realizar a manipulação do script SQL
const prisma = new PrismaClient()

//funcao para inserir um tipoPagamento no bando de dados
const insertTipoPagamento = async function(tipoPagamento){
    try {
        let sql = `insert into tbl_tipo_pagamento(
                                            tipo_pagamento
                                            )
                                      values(
                                             '${tipoPagamento.tipo_pagamento}'
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

//função para atualizar um TipoPagamento existente no banco de dados
const updateTipoPagamento = async function(tipoPagamento){
    try {
        let sql = `update tbl_tipo_pagamento set tipo_pagamento= '${tipoPagamento.tipo_pagamento}'
                                        where id=${tipoPagamento.id}`
                        
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

//função para excluir um TipoPagamento existente no banco de dados
const deleteTipoPagamento = async function(id){
    try {
        //script sql
        let sql = 'delete from tbl_tipo_pagamento where id='+id

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

//função para retornar todas as TipoPagamento do banco de dados
const selectAllTipoPagamento = async function(){
    try {
        let sql = 'select * from tbl_tipo_pagamento order by id desc'

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

//função para listar um TipoPagamento pelo ID no banco de dados
const selectByIdTipoPagamento = async function(id){
    try {
        //script sql
        let sql = 'select * from tbl_tipo_pagamento where id='+id

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
    insertTipoPagamento,
    updateTipoPagamento,
    deleteTipoPagamento,
    selectAllTipoPagamento,
    selectByIdTipoPagamento
}