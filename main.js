var nome = document.getElementById('nome');
var email = document.getElementById('email');
var fone = document.getElementById('fone');

function ValidarContato(){
    if(nome.value === '' || email.value === '' || fone.value === ''){
        alert('Preencha todos os campos');
        erros = true;
    }
    else{
        alert('Formulário enviado com sucesso');
    }
}

function Funcionando(){
    alert("Estou funcionando")
}