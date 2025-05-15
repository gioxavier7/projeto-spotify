/**
  * Objetivo: Controller responsável pela manipilação do CRUD de dados de playlist
  * Data: 17/04/2025
  * Dev: Giovanna
  * Versão: 1.0
  */

//import do arquivo de configurações de mensagens de status cpde
const MESSAGE = require('../../modulo/config.js')
 
//import do arquivo DAO de música para manipular o db
const playlistMusicaDAO = require('../../model/dao/playlist_musica.js')
const { json } = require('body-parser')

//funcao pra inserir um novo playlist
const inserirPlaylist = async function(playlistMusica, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
        {
            if(
                playlistMusica.id_playlist == '' || playlistMusica == null || playlistMusica == undefined || isNaN(playlistMusica.id_playlist) || playlistMusica.id_playlist <= 0 ||
                playlistMusica.id_musica == '' || playlistMusica == null || playlistMusica == undefined || isNaN(playlistMusica.id_musica) || playlistMusica.id_musica <= 0
            ){
                return MESSAGE.ERROR_REQUIRE_FIELDS //400
            }else{
                let resultPlaylist = await playlistMusicaDAO.insertPlaylist(playlistMusica)

                if(resultPlaylist)
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
const listarPlaylistMusica = async function(){
    try {

        // objeto json
        let dadosPlaylist = {}

        //chamar a função que retorna as playlist
        let resultPlaylist = await playlistMusicaDAO.selectAllPlaylistMusica()

        if(resultPlaylist != false || typeof(resultPlaylist) == 'object')
        {
            //criando um objeto JSON para retornar a lista de Playlists
            if(resultPlaylist.length > 0){
                dadosPlaylist.status = true
                dadosPlaylist.status_code = 200
                dadosPlaylist.item = resultPlaylist.length
                dadosPlaylist.musica = resultPlaylist

                return dadosPlaylist
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

//função para tratar o retorno de uma playlist filtrando pelo id do dao
const buscarPlaylistMusica = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRE_FIELDS //400
        }else{
            let dadosPlaylist = {}
            let resultPlaylist = await playlistMusicaDAO.selectByIdPlaylistMusica(parseInt(id))

            if(resultPlaylist != false || typeof(resultPlaylist) == 'object'){
                if(resultPlaylist.length > 0){
                    dadosPlaylist.status = true
                    dadosPlaylist.status_code = 200
                    dadosPlaylist.playlist = resultPlaylist

                    return dadosPlaylist
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

//função para atualizar um playlist existente
const atualizarPlaylistMusica = async function(playlistMusica, id, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
        {
            if(
                id == '' || id == undefined || id == null || isNaN(id) || id <= 0 ||
                playlistMusica.id_playlist == '' || playlistMusica.id_playlist == undefined || playlistMusica.id_playlist == null || isNaN(playlistMusica.id_playlist) || playlistMusica.id_playlist <= 0 ||
                playlistMusica.id_musica == '' || playlistMusica.id_musica == undefined || playlistMusica.id_musica == null || isNaN(playlistMusica.id_musica) || playlistMusica.id_musica <= 0
            ){
                return MESSAGE.ERROR_REQUIRE_FIELDS //400
            }else{
                //validar se o id existe no db
                let resultPlaylist = await playlistMusicaDAO.selectByIdPlaylistMusica(parseInt(id))

                if(resultPlaylist.status_code == 200){
                    //update
                    playlistMusica.id = id //adiciona o atributo id no json e e coloca o id da música que chegou na controller
                    let result = await playlistMusicaDAO.updatePlaylist(playlistMusica)

                    if(result){
                        return MESSAGE.SUCCESS_UPDATED_ITEM //200
                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                }else if(resultPlaylist.status_code == 404){
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

//função para excluir uma playlist existente
const excluirPlaylistMusica = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRE_FIELDS //400
        }else{
            // validar se o ID existe
            let resultPlaylist = await playlistMusicaDAO.selectByIdPlaylistMusica(parseInt(id))

            if(resultPlaylist.status_code == 200){
                // delete do user
                let result = await playlistMusicaDAO.deletePlaylist(id)
                if(result){
                    return MESSAGE.SUCCESS_DELETED_ITEM //200
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                }
            }else if(resultPlaylist.status_code == 404){
                return MESSAGE.ERROR_NOT_FOUND //404
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
            }
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const buscarMusicaPorPlaylist = async function(idPlaylist){
    try {
        if(idPlaylist == '' || idPlaylist == undefined || idPlaylist == null || isNaN(idPlaylist) || idPlaylist <=0){
            return MESSAGE.ERROR_REQUIRE_FIELDS //400
        }else{
            let dadosPlaylist = {}

            let resultPlaylist = await playlistMusicaDAO.selectMusicaByIdPlaylist(parseInt(idPlaylist))
            
            if(resultPlaylist != false || typeof(resultPlaylist) == 'object'){
                if(resultPlaylist.length > 0){
                     //Criando um JSON de retorno de dados para a API
                    dadosPlaylist.status = true
                    dadosPlaylist.status_code = 200
                    dadosPlaylist.musica = resultPlaylist

                    return dadosPlaylist //200
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
    inserirPlaylist,
    listarPlaylistMusica,
    buscarPlaylistMusica,
    atualizarPlaylistMusica,
    excluirPlaylistMusica,
    buscarMusicaPorPlaylist
}