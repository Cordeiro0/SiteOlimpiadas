function ValidarContato(){
    nome = document.getElementsByName("ctt_nome");
    email = document.getElementsByName("ctt_email");
    fone = document.getElementsByName("ctt_telefone");
    mensagem = document.getElementsByName("ctt_mensagem");

   if(nome.value === "" || email.value === "" || fone.value === "" || mensagem.value === ""){
        alert("Por favor, preencha todos os campos");
        return false;
   }
   else{
    alert("Mensagem enviado com sucesso!");
    return true;
   }
}

function Funcionando(){
    alert("Estou funcionando")
}