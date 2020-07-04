const configEmpresa  = require('./empresa');
exports.listaUsuarios = new Array();


// adiciona usuario no chat da empresa
exports.addUsuarioChat = function (data) {
     
    var statusAdd = false;
    var indexArray;
    //adicionar usuario na lista
    if (!configEmpresa.empresas) {
        console.log('Nenhuma empresa encontrada');
        return;
    }
    //adiciona usuario na empresa
    for (var x in configEmpresa.empresas) {
        console.log('Dentro da empresa');
        console.log(data);
        if (data.obj.idEmpresa == configEmpresa.empresas[x].id) {
            indexArray = x;
            this.adicionaLista(socket.id, data.obj.nome, data.obj.idEmpresa, socket.id);
            var sessaoChat = {
                idSessao: configEmpresa.empresas[x].idSessao,//id da empresa
                tokensessao: socket.id//id do usuario
            }
            socket.emit('tokensessao', sessaoChat);// envia os dados de sessao para o usuario
            statusAdd = true;
        }
    }

    if (!statusAdd) {
        console.log('Usuario nao foi adicionado na empresa, pois nao foi encontrado a empresa online.');
        console.log(data);
        socket.emit('statusChat', false);
    } else {
        console.log('Atualiza dados da empresa ' + configEmpresa.empresas[indexArray].nome);
         socket.to(configEmpresa.empresas[indexArray].idSessao).emit('guinho', configEmpresa.empresas[indexArray]);
         console.log('atualiza lista de usuarios na empresa ==>' + configEmpresa.empresas[indexArray].nome + " => " + configEmpresa.empresas[indexArray].idSessao);
    }
}


exports.adicionaLista = function(id, nome, idEmpresa, idSessao) {

    if (!id) { console.log('O id do usuario não foi informado'); return; }
    if (!nome) { console.log('O nome do usuario não foi informado'); return; }
    if (!idEmpresa) { console.log('O idEmpresa do usuario não foi informado'); return; }
    if (!idSessao) { console.log('A idSessao do usuario não foi informada'); return; }

    var usuario = {
        id: id,
        nome: nome,
        idEmpresa: idEmpresa,
        status: true,
        idSessao: idSessao,
        canal: idSessao,
        statusVisto: true,
        mensagens: []
    };
    // procura a empresa para adicionar o usuarios dentro dela
    for (var x in configEmpresa.empresas) {
        if (configEmpresa.empresas[x].id == idEmpresa) {
            console.log('Empresa encontrada! Agora o usuário será adicionado na empresa ' + configEmpresa.empresas[x].nome);
            configEmpresa.empresas[x].usuarios.push(usuario);
            this.listaUsuarios.push(usuario);
        }
    }

    this.listaUsuarios.push(usuario);



}