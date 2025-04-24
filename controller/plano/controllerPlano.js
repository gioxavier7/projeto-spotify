/**
  * Objetivo: Controller responsável pela manipilação do CRUD de dados de planos
  * Data: 24/04/2025
  * Dev: Giovanna
  * Versão: 1.0
  */

//import do arquivo de configurações de mensagens de status cpde
const MESSAGE = require('../../modulo/config.js')
 
//import do arquivo DAO de música para manipular o db
const planoDAO = require('../../model/dao/plano.js')
const { json } = require('body-parser')

//funcao pra inserir um novo plano
const inserirPlano = async function(plano, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
        {
            if(
                plano.nome == undefined || plano.nome == '' || plano.nome == null || plano.nome.length > 45 ||
                plano.preco == undefined ||  plano.preco == '' || plano.preco == null || plano.preco > 10 ||
                plano.beneficios == undefined || plano.beneficios == '' || plano.beneficios == null || plano.beneficios > 150
            ){
                return MESSAGE.ERROR_REQUIRE_FIELDS //400
            }else{
                let resultPlano = await planoDAO.insertPlano(plano)

                if(resultPlano)
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

//funcao pra listar todos as bandas
const listarPlano = async function(){
    try {
        let dadosPlano = {}

        //chamar a função que retorna os artistas
        let resultPlano = await planoDAO.selectAllPlano()

        if(resultPlano != false || typeof(resultPlano) == 'object')
        {
            //criando um objeto JSON para retornar a lista de Planos
            if(resultPlano.length > 0){
                dadosPlano.status = true
                dadosPlano.status_code = 200
                dadosPlano.item = resultPlano.length
                dadosPlano.plano = resultPlano
                return dadosPlano //200
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

//função para listar uma Plano pelo ID
const buscarPlano = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRE_FIELDS //400
        }else{
            let dadosPlano = {}
            let resultPlano = await planoDAO.selectByIdPlano(id)

            if(resultPlano != false || typeof(resultPlano) == 'object'){
                if(resultPlano.length > 0){
                    dadosPlano.status = true
                    dadosPlano.status_code = 200
                    dadosPlano.plano = resultPlano
                    return dadosPlano //200
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

//função para atualizar uma Plano existente
const atualizarPlano = async function(plano, id, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
        {
            if(
                plano.nome == undefined || plano.nome == '' || plano.nome == null || plano.nome.length > 45 ||
                plano.preco == undefined ||  plano.preco == '' || plano.preco == null || plano.preco > 10 ||
                plano.beneficios == undefined || plano.beneficios == '' || plano.beneficios == null || plano.beneficios > 150 ||
                id == '' || id == undefined || id == null || isNaN(id) || id <= 0
            ){
                return MESSAGE.ERROR_REQUIRE_FIELDS //400
            }else{
                //validar se o id existe no db
                let resultPlano = await buscarPlano(id)

                if(resultPlano.status_code == 200){
                    //update
                    plano.id = id //adiciona o atributo id no json e e coloca o id da Plano que chegou na controller
                    let result = await planoDAO.updatePlano(plano)

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

//função para excluir uma Plano existente
const excluirPlano = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRE_FIELDS //400
        }else{
            //validar se o id existe
            let resultPlano = await buscarPlano(id)

            if(resultPlano.status_code == 200){
                //delete
                let result = await planoDAO.deletePlano(id)
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
    inserirPlano,
    listarPlano,
    buscarPlano,
    atualizarPlano,
    excluirPlano
}