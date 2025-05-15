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

//função para inserir uma nova música
const inserirAlbum = async function(album, contentType){
    // try catch é uma forma de tratar o código para que a API não caia
    try {

        if(String(contentType) .toLowerCase() == 'application/json')
        {
        if (album.titulo == undefined || album.titulo == '' || album.titulo == null || album.titulo.length > 80 ||
            album.link == undefined || album.link == '' || album.link == null || album.link.length > 200 ||
            album.duracao == undefined || album.duracao == '' || album.duracao == null || album.duracao.length > 5 ||
            album.data_lancamento == undefined || album.data_lancamento == '' || album.data_lancamento == null || album.data_lancamento.length > 10 ||
            album.foto_capa == undefined || album.foto_capa.length > 200 ||
            album.id_banda == undefined || album.id_banda == '' 
        ){
            return MESSAGE.ERROR_REQUIRE_FIELDS
        }else{
            let resultalbum = await albumDAO.insertAlbum(album)
    
            if(resultMusica)
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