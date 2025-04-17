/**
  * Objetivo: Controller responsável pela manipilação do CRUD de dados de artista
  * Data: 17/04/2025
  * Dev: Giovanna
  * Versão: 1.0
  */

//import do arquivo de configurações de mensagens de status cpde
const MESSAGE = require('../../modulo/config.js')
 
//import do arquivo DAO de música para manipular o db
const artistaDAO = require('../../model/dao/artista.js')
const { json } = require('body-parser')

//funcao pra inserir um novo artista
const inserirArtista = async function(artista, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
        {
            if(
                artista.nome == undefined || artista.nome == '' || artista.nome == null || artista.nome.length > 50 ||
                artista.biografia == undefined ||  artista.biografia.length > 250
            ){
                return MESSAGE.ERROR_REQUIRE_FIELDS //400
            }else{
                let resultArtista = await artistaDAO.insertArtista(artista)

                if(resultArtista)
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

const listarArtista = async function(){
    try {
        let dadosArtista = {}

        //chamar a função que retorna os artistas
        let resultArtista = await artistaDAO.selectAllArtista()

        if(resultArtista != false || typeof(resultArtista) == 'object')
        {
            //criando um objeto JSON para retornar a lista de usuarios
            if(resultArtista.length > 0){
                dadosArtista.status = true
                dadosArtista.status_code = 200
                dadosArtista.item = resultArtista.length
                dadosArtista.artista = resultArtista
                return dadosArtista //200
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

//função para listar um usuario pelo ID
const buscarArtista = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRE_FIELDS //400
        }else{
            let dadosArtista = {}
            let resultArtista = await artistaDAO.selectByIdArtista(id)

            if(resultArtista != false || typeof(resultArtista) == 'object'){
                if(resultArtista.length > 0){
                    dadosArtista.status = true
                    dadosArtista.status_code = 200
                    dadosArtista.artista = resultArtista
                    return dadosArtista //200
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

module.exports = {
    inserirArtista,
    listarArtista,
    buscarArtista
}