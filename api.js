const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

var axios = require('axios');

const configMotoboy = require('./motoboy');
const configEmpresa = require('./empresa');
const configUsuarioChat = require('./usuarioChat');


configMotoboy.motoboy();

//Pasta onde fica o front and da aplicação
app.use(express.static(path.join(__dirname, 'public')));
///////////////////////////////////////////
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/', (req, res) => {
    res.render('index.html');
});
console.log('Server node online');



/*
axios.get('http://localhost/db.json').then(function(response){
    console.log(response.data); 
    entregas = response;
});
*/


// Isso quer dizer que quando toda vez que algum cliente se conectar a este servidor
io.on('connection', socket_ => {
   
    console.log('Cliente conectado: ' + socket_.id);
    configEmpresa.setSocket(socket_);

    socket_.on('disconnect', data => {
        console.log('usuario com o saiu ID:' + socket_.id);
        /*for (var x in listaUsuarios) {
            if (listaUsuarios[x].id == socket_.id) {
                console.log(listaUsuarios[x].nome + 'saiu do servidor.');
                console.log(listaUsuarios[x]);

                for (var empresa in empresas) {
                    if (empresas[empresa].id == listaUsuarios[x].idEmpresa) {
                        for (usuario in empresas[empresa].usuarios) {
                            if (empresas[empresa].usuarios[usuario].id == socket_.id) {
                                console.log(empresas[empresa].usuarios[usuario]);
                                empresas[empresa].usuarios[usuario].nome = 'Offline';
                                empresas[empresa].usuarios[usuario].status = false;
                                console.log('ENVIA SAIU')
                                socket_.to(empresas[empresa].idSessao).emit('usuariodesconectedo', empresas[empresa].usuarios[usuario]);
                                empresas[empresa].usuarios.splice(usuario);
                                console.log('Lista de usuarios da empresa');
                                console.log(empresas[empresa].usuarios[usuario]);
                                console.log('-------------------------------');
                            }
                        }
                    }
                }

            }
        }*/
    });

 
    socket_.on('recebeMsg', data => { // funcao resposavel por enviar mensagens entre os usuarios
        console.log('---------------recebeMsg-----------');
        console.log('Enviar mensagem para idSessao:' + data.sessao.idSessao);
        console.log(data);

        socket_.to(data.sessao.idSessao).emit('enviaMsg', data);

        // salvar msg no usuario
        for (var empresa in configEmpresa.empresas) {
            if (configEmpresa.empresas[empresa].id == data.idEmpresa) {
                console.log('Empresa encontrada');
                for (var usu in configEmpresa.empresas[empresa].usuarios) {
                    if (configEmpresa.empresas[empresa].usuarios[usu].canal == data.canal) {
                        console.log('usuario encontrado');
                        //console.log(configEmpresa.empresas[empresa].usuarios[usu]);
                        configEmpresa.empresas[empresa].usuarios[usu].mensagens.push(data.mensagem);
                    }
                }
            }
        }
        console.log('---------------recebeMsg-----------');
    });


   

  


    socket_.on('acao', data => { // funcao resposavel por enviar mensagens entre os usuarios
        console.log('~~~~~~ ~~ ACAO ~~ ~~~~ => ' + data.acao);
        // console.log(data);
        switch (data.acao) {
            case 'addMotoboy': {
               configMotoboy.addMotoboy(data);
            } break;

            case 'attStatusMotoboy': {
                configMotoboy.attStatusMotoboy(data);
            } break;

            case 'attCoordMotoboy': {
                configMotoboy.attCoordMotoboy(data);
            } break;

            case 'addEmpresa': {
                configEmpresa.addEmpresa(data);
            } break;

            case 'addUsuario': {
                configUsuarioChat.addUsuarioChat(data);
            } break;

            default: { 
                console.log('Erro swith acao'); 
                console.log(data); 
            }
        }

    });
     


});


server.listen(3000);
