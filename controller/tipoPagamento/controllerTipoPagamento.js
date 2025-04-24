/**
  * Objetivo: Controller responsável pela manipilação do CRUD de dados de tipo pagamento
  * Data: 24/04/2025
  * Dev: Giovanna
  * Versão: 1.0
  */

//import do arquivo de configurações de mensagens de status cpde
const MESSAGE = require('../../modulo/config.js')
 
//import do arquivo DAO de música para manipular o db
const tipoPagamentoDAO = require('../../model/dao/tipoPagamento.js')
const { json } = require('body-parser')

//funcao pra inserir um novo TipoPagamento
const inserirTipoPagamento = async function(tipoPagamento, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
        {
            if(
                tipoPagamento.tipo_pagamento == undefined || tipoPagamento.tipo_pagamento == '' || tipoPagamento.tipo_pagamento == null || tipoPagamento.tipo_pagamento.length > 45
            ){
                return MESSAGE.ERROR_REQUIRE_FIELDS //400
            }else{
                let resultTipoPagamento = await tipoPagamentoDAO.insertTipoPagamento(tipoPagamento)

                if(resultTipoPagamento)
                    return MESSAGE.SUCCESS_CREATED_ITEM //201
                else
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }else{
            return MESSAGE.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//funcao pra listar todos as TipoPagamento
const listarTipoPagamento = async function(){
    try {
        let dadosTipoPagamento = {}

        //chamar a função que retorna os artistas
        let resultTipoPagamento = await tipoPagamentoDAO.selectAllTipoPagamento()

        if(resultTipoPagamento != false || typeof(resultTipoPagamento) == 'object')
        {
            //criando um objeto JSON para retornar a lista de TipoPagamentos
            if(resultTipoPagamento.length > 0){
                dadosTipoPagamento.status = true
                dadosTipoPagamento.status_code = 200
                dadosTipoPagamento.item = resultTipoPagamento.length
                dadosTipoPagamento.tipoPagamento = resultTipoPagamento
                return dadosTipoPagamento //200
            }else{
                return MESSAGE.ERROR_NOT_FOUND //404
            }
        }else{
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
        }

    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//função para listar uma Tipo Pagamento pelo ID
const buscarTipoPagamento = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRE_FIELDS //400
        }else{
            let dadosTipoPagamento = {}
            let resultTipoPagamento = await tipoPagamentoDAO.selectByIdTipoPagamento(id)

            if(resultTipoPagamento != false || typeof(resultTipoPagamento) == 'object'){
                if(resultTipoPagamento.length > 0){
                    dadosTipoPagamento.status = true
                    dadosTipoPagamento.status_code = 200
                    dadosTipoPagamento.tipoPagamento = resultTipoPagamento
                    return dadosTipoPagamento //200
                }else{
                    return MESSAGE.ERROR_NOT_FOUND //404
                }
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//função para atualizar uma Tipo Pagamento existente
const atualizarTipoPagamento = async function(tipoPagamento, id, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
        {
            if(
                tipoPagamento.tipo_pagamento == undefined || tipoPagamento.tipo_pagamento == '' || tipoPagamento.tipo_pagamento == null || tipoPagamento.tipo_pagamento.length > 45 ||
                id == '' || id == undefined || id == null || isNaN(id) || id <= 0
            ){
                return MESSAGE.ERROR_REQUIRE_FIELDS //400
            }else{
                //validar se o id existe no db
                let resultTipoPagamento = await buscarTipoPagamento(id)

                if(resultTipoPagamento.status_code == 200){
                    //update
                    tipoPagamento.id = id //adiciona o atributo id no json e e coloca o id da TipoPagamento que chegou na controller
                    let result = await tipoPagamentoDAO.updateTipoPagamento(tipoPagamento)

                    if(result){
                        return MESSAGE.SUCCESS_UPDATED_ITEM //200
                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                }else if(resultPlano.status_code == 404){
                    return MESSAGE.ERROR_NOT_FOUND //404
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
                }
            }
        }else{
            return MESSAGE.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//função para excluir uma TipoPagamento existente
const excluirTipoPagamento = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRE_FIELDS //400
        }else{
            //validar se o id existe
            let resultTipoPagamento = await buscarTipoPagamento(id)

            if(resultTipoPagamento.status_code == 200){
                //delete
                let result = await tipoPagamentoDAO.deleteTipoPagamento(id)
                if(result){
                    return MESSAGE.SUCCESS_DELETED_ITEM //200
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                }
            }else if(resultBanda.status_code == 404){
                return MESSAGE.ERROR_NOT_FOUND //404
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
            }
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

module.exports = {
    inserirTipoPagamento,
    listarTipoPagamento,
    buscarTipoPagamento,
    atualizarTipoPagamento,
    excluirTipoPagamento
}