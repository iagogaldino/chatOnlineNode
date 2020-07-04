exports.result = function(mensagem, erro) {
    var result = { erro: Boolean, mensagem: String };
    result.mensagem = mensagem;
    result.erro = erro;
    console.log(result);
    return result;
}