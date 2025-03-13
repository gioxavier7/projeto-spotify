/**
 * Objetivo: Arquivo de configuração do projeto onde teremos mensagens padronizadas, variáveis e constantes para o projeto
 * Data: 13/02/2025
 * Dev: Giovanna
 * Versão: 1.0 
 */

/**MENSAGENS DE STATUS CODE PARA A API
 *      MENSAGENS DE ERRO
 */
const ERROR_REQUIRE_FIELDS = {status: false, status_code: 400, message: 'Existem campos com preenchimento obrigatórios e não foram encaminhados.'}
const ERROR_INTERNAL_SERVER_MODEL = {status: false, status_code: 500, message: 'Devido ao um erro interno do servidor de modelagem de dados, não foi possível processar a requisição.'}
const ERROR_INTERNAL_SERVER_CONTROLLER = {status: false, status_code: 500, message: 'Devido ao um erro interno do servidor de controle de dados, não foi possível processar a requisição.'}
const ERROR_CONTENT_TYPE = {status: false, status_code: 415, message: 'Não foi possível processar a requisição, pois o tipo de dados encaminhados não são aceitos na API. Você deve encaminhar somente JSON.'}
const ERROR_NOT_FOUND = {status: false, status_code: 404, message: 'Não foram encontrados dados para retornar.'}

/**MENSAGENS DE STATUS CODE PARA A API
 *      MENSAGENS DE SUCESSO
 */

const SUCCESS_CREATED_ITEM = {status: true, status_code: 201, message: 'Item criado com sucesso!'}
const SUCCESS_DELETED_ITEM = {status: true, status_code: 200, message: 'Item deletado com sucesso!'}

module.exports = {
    ERROR_REQUIRE_FIELDS,
    ERROR_INTERNAL_SERVER_MODEL,
    ERROR_INTERNAL_SERVER_CONTROLLER,
    ERROR_CONTENT_TYPE,
    ERROR_NOT_FOUND,
    SUCCESS_CREATED_ITEM,
    SUCCESS_DELETED_ITEM
    
}