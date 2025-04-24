/**
  * Objetivo: Controller responsável pela manipilação do CRUD de dados de bandas
  * Data: 24/04/2025
  * Dev: Giovanna
  * Versão: 1.0
  */

//import do arquivo de configurações de mensagens de status cpde
const MESSAGE = require('../../modulo/config.js')
 
//import do arquivo DAO de música para manipular o db
const bandaDAO = require('../../model/dao/banda.js')
const { json } = require('body-parser')

//funcao pra inserir uma nova banda
const inserirBanda = async function(banda, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
        {
            if(
                banda.nome == undefined || banda.nome == '' || banda.nome == null || banda.nome.length > 45 ||
                banda.integrantes == undefined ||  banda.integrantes.length > 200
            ){
                return MESSAGE.ERROR_REQUIRE_FIELDS //400
            }else{
                let resultBanda = await bandaDAO.insertBanda(banda)

                if(resultBanda)
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
const listarBanda = async function(){
    try {
        let dadosBanda = {}

        //chamar a função que retorna os artistas
        let resultBanda = await bandaDAO.selectAllBanda()

        if(resultBanda != false || typeof(resultBanda) == 'object')
        {
            //criando um objeto JSON para retornar a lista de bandas
            if(resultBanda.length > 0){
                dadosBanda.status = true
                dadosBanda.status_code = 200
                dadosBanda.item = resultBanda.length
                dadosBanda.banda = resultBanda
                return dadosBanda //200
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

//função para listar uma banda pelo ID
const buscarBanda = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRE_FIELDS //400
        }else{
            let dadosBanda = {}
            let resultBanda = await bandaDAO.selectByIdBanda(id)

            if(resultBanda != false || typeof(resultBanda) == 'object'){
                if(resultBanda.length > 0){
                    dadosBanda.status = true
                    dadosBanda.status_code = 200
                    dadosBanda.banda = resultBanda
                    return dadosBanda //200
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

//função para atualizar uma banda existente
const atualizarBanda = async function(banda, id, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
        {
            if(
                banda.nome == undefined || banda.nome == '' || banda.nome == null || banda.nome.length > 45 ||
                banda.integrantes == undefined ||  banda.integrantes.length > 200 ||
                id == '' || id == undefined || id == null || isNaN(id) || id <= 0
            ){
                return MESSAGE.ERROR_REQUIRE_FIELDS //400
            }else{
                //validar se o id existe no db
                let resultBanda = await buscarBanda(id)

                if(resultBanda.status_code == 200){
                    //update
                    banda.id = id //adiciona o atributo id no json e e coloca o id da banda que chegou na controller
                    let result = await bandaDAO.updateBanda(banda)

                    if(result){
                        return MESSAGE.SUCCESS_UPDATED_ITEM //200
                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                }else if(resultBanda.status_code == 404){
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

//função para excluir uma banda existente
const excluirBanda = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRE_FIELDS //400
        }else{
            //validar se o id existe
            let resultBanda = await buscarBanda(id)

            if(resultBanda.status_code == 200){
                //delete
                let result = await bandaDAO.deleteBanda(id)
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
    inserirBanda,
    listarBanda,
    buscarBanda,
    atualizarBanda,
    excluirBanda
}