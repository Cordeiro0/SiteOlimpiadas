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


function ValidarLogin(){
    	const nome = document.getElementById('nome-login');
        const email = document.getElementById('email-login');
        const senha = document.getElementById('senha-login');

        if(nome.value === '' || email.value === '' || senha.value === ''){
            alert('Preencha todos os campos');
            erros = true;
        }
        else{
            alert('Login realizado com sucesso');
            window.location.replace('index.html');
        }
}

function Funcionando(){
    alert("Estou funcionando")
}
