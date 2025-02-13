/**
 * objetivo: model responsável pelo CRUD de dados de música no banco de dados
 * data: 13/02/2025
 * dev: giovanna
 * versão: 1.0
 */

//import da biblioteca Prisma/Client
const { PrismaClient } = require('@prisma/client')

//função para inserir uma nova música no banco de dados
const insertMusica = async function(musica){

    //instanciando (criar um novo objeto) para realizar a manipulação do script SQL
    const prisma = new PrismaClient()

    let sql = `insert into tbl_musica ( nome,
                                        link,
                                        duracao,
                                        data_lancamento,
                                        foto_capa,
                                        letra
                                        )
                                values (
                                        ${musica.nome},
                                        ${musica.link},
                                        ${musica.duracao},
                                        ${musica.data_lancamento},
                                        ${musica.foto_capa},
                                        ${musica.letra}
                                        )`

    //executa o script SQL no DB e aguarda o retorno do DB
    let result = await prisma.$exeuteRawUnsafe(sql)

    if(result){
        return true
    }else{
        return false
    }
}

//função para atualizar uma música existente no banco de dados
const updateMusica = async function(){

}

//função para excluir uma música existente no banco de dados
const deleteMusica = async function(){

}

//função para retornar todas as músicas do banco de dados
const selectAllMusica = async function(){

}

//função para listar uma música pelo ID no banco de dados
const selectByIdMusica = async function(){

}

module.exports = {
    insertMusica,
    updateMusica,
    deleteMusica,
    selectAllMusica,
    selectByIdMusica
}