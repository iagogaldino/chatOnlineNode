
const result = require('./result');

/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
exports.listaMotoboys = []; // lista de motoboys conectados
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////// adiciona o motoboy na lista se ainda não estiver adicionado se estiver adicionado retorna um  == false
exports.addMotoboy = function (data) {

    if (this.motoboy(data.motoboy.id) === true) { 
        console.log('O motoboy já está adicionado na lista'); 
        return; 
    }

    if (!data.motoboy.id && !data.motoboy.nome || !data.motoboy.email) {
        result('O nome do motoboy não foi informado', true);
        return;
    }
    console.log('Motboy adicionado na lista');
    this.listaMotoboys.push(data.motoboy);
    this.mostraQuantidadeM();

}
/////////////////////////////////////////////////////////////////////////////
// atualiza o status do motoboy para true ou false //////////////////////////
exports.attStatusMotoboy = function (data) {
    this.motoboy(data.obj.id).status = data.obj.status;
}
/////////// insere a latitude e logitude do motoboy ////////////////////////
exports.attCoordMotoboy = function (data) {
    try {
        // console.log('--> attCoordMotoboy == ' + data.obj.coordenadas);
        //console.warn(data.obj.coordenadas);
        // console.clear();
        data.obj.coordenadas = data.obj.coordenadas.split(",");
        this.motoboy(data.obj.id).coordenadas =  data.obj.coordenadas;
        this.socket.broadcast.emit('coordenadas', data.obj);
    } catch (e) { /* ERRO */ }
}
/////////////////////////////////////////////////////////////////////////////
//////// consulta o motoboy adicionado na lista e retorna como objeto //////// 
exports.motoboy = function (id) { // encontra motoboy na lista pelo ID
    if (!id) { console.log('O id do motoboy não foi informado, por isso nao foi possível procurar na lista.'); return; }
    var statusConsulta = false;
    var indexArray;

    console.log('funcao que att motboy');
    if (!id) {
        result('O id do motoboy não foi informado', true);
        return;
    }

    for (const x in this.listaMotoboys) {
        if (this.listaMotoboys[x].id === id) {
            statusConsulta = true;
            indexArray = x;
        }
    }

    if (statusConsulta) {
        // atualiza o status do motoboy
        console.log('Motoboy encontrado na lista.');
        return this.listaMotoboys[indexArray].status;
    } else {
        return statusConsulta;
    }

}
/////////////////////////////////////////////////////////////////////////////
exports.removerMotoboyLista = function () {
    // funcao que remove o motoboy da lista
}
/////////////////////////////////////////////////////////////////////////////
exports.getListaBotoboys = function () {
    return this.listaMotoboys;
}
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
exports.mostraQuantidadeM = function(socket) {
    // envia a quantidade de motoboys online
    // this.socket.broadcast.emit('qntmt', this.listaMotoboys.length);
}
/////////////////////////////////////////////////////////////////////////////
