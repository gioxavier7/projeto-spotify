/**
 * Objetivo: Controller responsável pela manipilação do CRUD de dados de música
 * Data: 15/05/2025
 * Dev: Giovanna
 * Versão: 1.0
 */

//import do arquivo de configurações de mensagens de status cpde
const MESSAGE = require('../../modulo/config.js')

//import do arquivo DAO de música para manipular o db
const albumDAO = require('../../model/dao/album.js')
const { json } = require('body-parser')

//Import das controlleres para criar as relações com a playlist
const controllerBanda = require('../banda/controllerBanda.js')

//função para inserir uma nova música
const inserirAlbum = async function(album, contentType){
    // try catch é uma forma de tratar o código para que a API não caia
    try {

        if(String(contentType) .toLowerCase() == 'application/json')
        {
        if (album.titulo == undefined || album.titulo == '' || album.titulo == null || album.titulo.length > 80 ||
            album.link == undefined || album.link == '' || album.link == null || album.link.length > 200 ||
            album.duracao == undefined || album.duracao == '' || album.duracao == null || album.duracao.length > 10 ||
            album.data_lancamento == undefined || album.data_lancamento == '' || album.data_lancamento == null || album.data_lancamento.length > 10 ||
            album.foto_capa == undefined || album.foto_capa.length > 200 ||
            album.id_banda == undefined || album.id_banda == '' 
        ){
            return MESSAGE.ERROR_REQUIRE_FIELDS
        }else{
            let resultAlbum = await albumDAO.insertAlbum(album)
    
            if(resultAlbum)
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

// funcao pra tratar o retorno de uma lista de playlist do dao
const listarAlbum = async function(){
    try {

        // objeto do tipo array pra utilizar no foreach pra carregar os dados da Album e do usuario
        const arrayAlbum = []

        // objeto json
        let dadosAlbum = {}

        //chamar a função que retorna as musicas
        let resultAlbum = await albumDAO.selectAllAlbum()

        if(resultAlbum != false || typeof(resultAlbum) == 'object')
        {
            //criando um objeto JSON para retornar a lista de Albums
            if(resultAlbum.length > 0){
                dadosAlbum.status = true
                dadosAlbum.status_code = 200
                dadosAlbum.item = resultAlbum.length
                
                // for of pra trabalhar com requisição async e await
                for(itemAlbum of resultAlbum){
                    // busca os dados do usuarui na controller banda utilizando o id do banda (chave estrangeira)
                    let dadosBanda = await controllerBanda.buscarBanda(itemAlbum.id_banda)

                    //adicionando um atributo "banda" no json de Albums
                    itemAlbum.banda = dadosBanda.banda

                    //remove o atributo id_banda do json de Album, pois ja tem o id dentro dos dados de banda
                    delete itemAlbum.id_banda

                    //adiciona o json do filme, agoa com os dados de banda em um array
                    arrayAlbum.push(itemAlbum)
                }
                //adiciona o novo array de Album o json pra retornar ao app
                dadosAlbum.Album = arrayAlbum

                return dadosAlbum
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

//função para listar uma album pelo ID
const buscarAlbum = async function(id){
    try {

        let arrayAlbum = []

        if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRE_FIELDS //400
        }else{
            let dadosAlbum = {}
            let resultAlbum = await albumDAO.selectByIdAlbum(id)

            if(resultAlbum != false || typeof(resultAlbum) == 'object'){
                if(resultAlbum.length > 0){
                    dadosAlbum.status = true
                    dadosAlbum.status_code = 200

                // for of pra trabalhar com requisição async e await
                for(itemAlbum of resultAlbum){
                    // busca os dados do usuarui na controller banda utilizando o id do banda (chave estrangeira)
                    let dadosBanda = await controllerBanda.buscarBanda(itemAlbum.id_banda)

                    //adicionando um atributo "banda" no json de Albums
                    itemAlbum.banda = dadosBanda.banda

                    //remove o atributo id_banda do json de Album, pois ja tem o id dentro dos dados de banda
                    delete itemAlbum.id_banda

                    //adiciona o json do filme, agoa com os dados de banda em um array
                    arrayAlbum.push(itemAlbum)
                }
                //adiciona o novo array de Album o json pra retornar ao app
                dadosAlbum.Album = arrayAlbum

                return dadosAlbum    

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

//função para atualizar um album existente
const atualizarAlbum = async function(album, id, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
        {
            if(
                album.titulo == undefined || album.titulo == '' || album.titulo == null || album.titulo.length > 80 ||
                album.link == undefined || album.link == '' || album.link == null || album.link.length > 200 ||
                album.duracao == undefined || album.duracao == '' || album.duracao == null || album.duracao.length > 5 ||
                album.data_lancamento == undefined || album.data_lancamento == '' || album.data_lancamento == null || album.data_lancamento.length > 10 ||
                album.foto_capa == undefined || album.foto_capa.length > 200 ||
                album.id_banda == undefined || album.id_banda == '' ||
                id == '' || id == undefined || id == null || isNaN(id) || id <= 0
            ){
                return MESSAGE.ERROR_REQUIRE_FIELDS //400
            }else{
                //validar se o id existe no db
                let resultAlbum = await buscarAlbum(id)

                if(resultAlbum.status_code == 200){
                    //update
                    album.id = id //adiciona o atributo id no json e e coloca o id da Album que chegou na controller
                    let result = await albumDAO.updateAlbum(album)

                    if(result){
                        return MESSAGE.SUCCESS_UPDATED_ITEM //200
                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                }else if(resultAlbum.status_code == 404){
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

//função para excluir uma Album existente
const excluirAlbum = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRE_FIELDS //400
        }else{
            //validar se o id existe
            let resultAlbum = await buscarAlbum(id)

            if(resultAlbum.status_code == 200){
                //delete
                let result = await albumDAO.deleteAlbum(id)
                if(result){
                    return MESSAGE.SUCCESS_DELETED_ITEM //200
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                }
            }else if(resultAlbum.status_code == 404){
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
    inserirAlbum,
    listarAlbum,
    buscarAlbum,
    atualizarAlbum,
    excluirAlbum
}