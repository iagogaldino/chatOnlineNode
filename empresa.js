exports.empresas = [
    /*  {
          nome: "XDelssy Delivery",
          id: "2",
          idSessao: "44a7Co5XiyHHvjdAAAAA",
          usuarios: [// lista usuarios
              {
                  sessao: {
                      idSessao: 'pVdsCCbziBFxfIv6AAAI',
                      tokensessao: 'xxx'
                  },
                  nome: 'Usuário Menu',
                  idEmpresa: '2',
                  mensagens: [
                      {// lista de mensagens salvas
                          mensagem: { // dados mensagem
                              nome: 'XDelssy Delivery',
                              tipo: 'server',
                              mensagem: 'asdasd',
                              info: '14:04 29/06/2020'
                          } // dados mensagem
                      }// lista de mensagens salvas
                  ], // mensagens salvas do usuario
                  canal: 'pVdsCCbziBFxfIv6AAAI',
                  mensagem: { // dados mensagem
                      nome: 'XDelssy Delivery',
                      tipo: 'server',
                      mensagem: 'asdasd',
                      info: '14:04 29/06/2020'
                  } // dados mensagem
              }
          ]// lista usuarios
      }*/
];
 
exports.socket = '';


// adiciona empresa na lista
exports.empresa = function (socketId, idEmpresa, nomeEmpresa) {
    // funcao que adiciona empresa na array de empresas
    if (!idEmpresa) { console.log('O id da empresa não foi informado'); return; }
    if (!nomeEmpresa) { console.log('O nome da empresa nao foi informado'); return; }
    if (!socketId) { console.log('O socket.id não foi informado'); return; }


    var e = {
        nome: nomeEmpresa,
        id: idEmpresa,
        idSessao: socketId,
        usuarios: []// lista usuarios
    }



    this.empresas.push(e);
    console.log('Empresa adicionada na lista de empresas.');

}

exports.addEmpresa = function (data) {
    var addemp = false;
    //verifica se a empresa já está adicionada
    for (var x in this.empresas) {
        if (data.obj.id == this.empresas[x].id) {
            addemp = true;
        }
    }
    // se a empresa nao estiver adiciona adiciona
    if (!addemp) {
        this.empresa(socket.id, data.obj.id, data.obj.nome)
         socket.emit('tokensessao', socket.id);
         socket.broadcast.emit('statusChat', true);
    } else {
        // empresa já adicionada!
        console.log('Empresa já está adicionada: ' + this.empresas[x].idSessao);
        // envie novo id de sessao aos usuarios conectados
        for (usu in this.empresas[x].usuarios) {
            if (this.empresas[x].usuarios[x].status == true) {// envia apenas para os usuarios que estao online na empresa
                console.log('Envie novo id socket ' + socket.id + ' para o usuario ' + this.empresas[x].usuarios[x].canal);
                console.log(this.empresas[x].usuarios[x]);
                this.empresas[x].usuarios[x].idSessao = socket.id;
                socket.to(this.empresas[x].usuarios[x].canal).emit('novoIdEmpresa', socket.id);
            }
        }
        // envia lista de usuarios da sessao para empresa
        setTimeout(function () {
            console.log('envia lista');
            console.log(this.empresas[x]);
            socket.emit('guinho', this.empresas[x]);
        }, 1100)


    }
}

exports.setSocket = function(socket_) {
    socket = socket_;
}