/**
  * Objetivo: Controller responsável pela manipilação do CRUD de dados de data vigencia
  * Data: 24/04/2025
  * Dev: Giovanna
  * Versão: 1.0
  */

//import do arquivo de configurações de mensagens de status code
const MESSAGE = require('../../modulo/config.js')
 
//import do arquivo DAO de música para manipular o db
const dataVigenciaDAO = require('../../model/dao/dataVigencia.js')
const { json } = require('body-parser')

//funcao pra inserir uma nova data vigencia
const inserirDataVigencia = async function(dataVigencia, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
        {
            if(
                dataVigencia.data_inicio == undefined || dataVigencia.data_inicio == '' || dataVigencia.data_inicio == null || dataVigencia.data_inicio.length > 11 ||
                dataVigencia.data_termino == undefined || dataVigencia.data_termino == '' || dataVigencia.data_termino == null || dataVigencia.data_termino.length > 11
            ){
                return MESSAGE.ERROR_REQUIRE_FIELDS //400
            }else{
                let resultDataVigencia = await dataVigenciaDAO.insertDataVigencia(dataVigencia)

                if(resultDataVigencia)
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

//funcao pra listar todos as datas
const listarDataVigencia = async function(){
    try {
        let dadosDataVigencia = {}

        //chamar a função que retorna os artistas
        let resultDataVigencia = await dataVigenciaDAO.selectAllDataVigencia()

        if(resultDataVigencia != false || typeof(resultDataVigencia) == 'object')
        {
            //criando um objeto JSON para retornar a lista de DataVigencias
            if(resultDataVigencia.length > 0){
                dadosDataVigencia.status = true
                dadosDataVigencia.status_code = 200
                dadosDataVigencia.item = resultDataVigencia.length
                dadosDataVigencia.DataVigencia = resultDataVigencia
                return dadosDataVigencia //200
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

//função para listar uma data pelo id
const buscarDataVigencia = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRE_FIELDS //400
        }else{
            let dadosDataVigencia = {}
            let resultDataVigencia = await dataVigenciaDAO.selectByIdDataVigencia(id)

            if(resultDataVigencia != false || typeof(resultDataVigencia) == 'object'){
                if(resultDataVigencia.length > 0){
                    dadosDataVigencia.status = true
                    dadosDataVigencia.status_code = 200
                    dadosDataVigencia.DataVigencia = resultDataVigencia
                    return dadosDataVigencia //200
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

//função para atualizar uma data existente
const atualizarDataVigencia = async function(dataVigencia, id, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
        {
            if(
                dataVigencia.data_inicio == undefined || dataVigencia.data_inicio == '' || dataVigencia.data_inicio == null || dataVigencia.data_inicio.length > 11 ||
                dataVigencia.data_termino == undefined || dataVigencia.data_termino == '' || dataVigencia.data_termino == null || dataVigencia.data_termino.length > 11 ||
                id == '' || id == undefined || id == null || isNaN(id) || id <= 0
            ){
                return MESSAGE.ERROR_REQUIRE_FIELDS //400
            }else{
                //validar se o id existe no db
                let resultDataVigencia = await buscarDataVigencia(id)

                if(resultDataVigencia.status_code == 200){
                    //update
                    dataVigencia.id = id //adiciona o atributo id no json e e coloca o id da DataVigencia que chegou na controller
                    let result = await dataVigenciaDAO.updateDataVigencia(dataVigencia)

                    if(result){
                        return MESSAGE.SUCCESS_UPDATED_ITEM //200
                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                }else if(resultDataVigencia.status_code == 404){
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

//função para excluir uma DataVigencia existente
const excluirDataVigencia = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRE_FIELDS //400
        }else{
            //validar se o id existe
            let resultDataVigencia = await buscarDataVigencia(id)

            if(resultDataVigencia.status_code == 200){
                //delete
                let result = await dataVigenciaDAO.deleteDataVigencia(id)
                if(result){
                    return MESSAGE.SUCCESS_DELETED_ITEM //200
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                }
            }else if(resultDataVigencia.status_code == 404){
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
    inserirDataVigencia,
    listarDataVigencia,
    buscarDataVigencia,
    atualizarDataVigencia,
    excluirDataVigencia
}