var nome = document.getElementById('nome');
var email = document.getElementById('email');
var fone = document.getElementById('fone');

function ValidarContato(){
    if(nome.value === '' || email.value === '' || fone.value === ''){
        alert('Preencha todos os campos');
        return false;
    }
    else{
        alert('Formulário enviado com sucesso');
        return true;
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
            alert('Login realizado com sucesso, ' + nome.value);
            window.location.replace('index.html');
        }
}

/*PARTE DA API DE MEDALHAS*/

async function carregarMedalhas(){
    try{
         // extraindo a API do dono
         const response = await fetch('https://apis.codante.io/olympic-games/countries');
        
         if (!response.ok) {
             throw new Error('Erro ao carregar o arquivo JSON: ' + response.statusText);
         }
 
         // Convertendo a resposta para JSON
         const data = await response.json();
 
         const tbody = document.getElementById('medals-body');
         if (!tbody) {
             throw new Error('Elemento com ID "medals-body" não encontrado.');
         }
         tbody.innerHTML = ''; // Limpa o conteúdo existente
 
         data.data.forEach(result => { 
             const row = document.createElement('tr');
             row.innerHTML = `
                 <td>${result.rank}</td>
                 <td><img src="${result.flag_url}" width="35%" alt="${result.name}"></td>
                 <td>${result.name}</td>
                 <td>${result.gold_medals}</td>
                 <td>${result.silver_medals}</td>
                 <td>${result.bronze_medals}</td>
                 <td>${result.total_medals}</td>
             `;
             tbody.appendChild(row);
         });

     
    }//tenta carregar toda a página com tudo funcioando, se não gera um erro falando que não deu =) 
    catch(error){
        console.error("Erro ao carregar dados: " + error);
    }
} 

async function getAtletasMedalhistas() {
    try {
        const response = await fetch('https://apis.codante.io/olympic-games/events')
        const ordersAtletas = await response.json()
  
      if (!response.ok) {
        throw new Error('Erro ao carregar o arquivo JSON: ' + response.statusText)
      }
  
      const tbody = document.getElementById('brasil-medals')
      if (!tbody) {
        throw new Error('Elemento com ID "brasil-medals" não foi encontrado caro amigo meu')
      }
  

    console.log(ordersAtletas.data); // Log os dados

    ordersAtletas.data.forEach(event => {
        event.competitors.forEach(competitor => {
            if(event.country_id === "Argentina"){
                console.log(competitor)
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${competitor.competitor_name}</td>
                    <td>${event.discipline_name}</td>
                    <td>${competitor.result_mark}</td>
                `;
                tbody.appendChild(row);
            }
            

        });
    });
  
    } catch (error) {
      console.error("Não foi possível encontrar os dados da table Brasil erro: " + error)
    }


}

document.addEventListener("DOMContentLoad", function() {
    const formCadastro = document.querySelector("#form-cad");

    if(formCadastro){
        formCadastro.addEventListener("submit", function(e){
            e.preventDefault();
            ValidarCadastro();
        })
    }
    else{
        console.error('Formulário não encontrado')
    }
})
  
async function ValidarCadastro(){

    const elementos = {
        nome: document.getElementById('nome-cad'),
        email: document.getElementById('email-cad'),
        senha: document.getElementById('senha-cad'),
        confirmarSenha: document.getElementById('confirm-senha-cad'),
        city: document.getElementById('city-cad')
    };

    for (let [key, value] of Object.entries(elementos)) {
        if (!value) {
            console.error(`Elemento não encontrado: ${key}`);
        }
    }

    const nome = document.getElementById('nome-cad');
    const email = document.getElementById('email-cad');
    const senha = document.getElementById('senha-cad');
    const confirmarSenha = document.getElementById('confirm-senha-cad');
    const cpf = document.getElementById('cpf-cad');
    const phone = document.getElementById('tel-cad');
    const address = document.getElementById('address-cad');
    const city = document.getElementById('city-cad');
    const zipcode = document.getElementById('cep-cad'); //cep
    const terms = document.getElementById('terms-cad');

    if (!nome || !email || !senha || !confirmarSenha || !cpf ||!phone ||!address ||!city ||!zipcode ||!terms.checked) {
        console.error('Um ou mais elementos do formulário não foram encontrados');
        console.log("Nã foi póssivel encontar os elementos", elementos)
        alert('Erro ao carregar o formulário. Por favor, recarregue a página.');
        return false;
    }

    if(nome.value === "" || email.value === "" || senha.value === "" || confirmarSenha.value === ""){
        alert('Preencha todos os campos');
        return false;
    }
    
    if(senha.value !== confirmarSenha.value){
        alert('As senhas não coincidem');
        return false;
    }

    if(senha.value.length < 8){
        alert('A senha deve ter pelo menos 8 caracteres');
        return false;
    }

    try {
        const response = await fetch('https://apis.codante.io/api/register-user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: nome.value,
                email: email.value,
                password: senha.value,
                password_confirmation: confirmarSenha.value,
                phone: phone.value,
                cpf: cpf.value,
                address: address.value,
                city: city.value,
                zipcode: zipcode.value,
                terms: terms.checked
            })
        });

        console.log('Resposta da API:', response);

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Detalhes do erro:', errorData);
            throw new Error(errorData.message || 'Erro desconhecido ao cadastrar usuário');
        }

        const data = await response.json();
        alert("Obrigado pelo cadastro " + data.name + "!");
        console.log('Dados do usuário registrados:', data);
    } catch (error) {
        console.error('Erro completo:', error);
        alert("Não foi possível realizar o cadastro: " + error.message);
    }
    
}


window.onload = function CarregarTabelas(){
    carregarMedalhas();
    // getAtletasMedalhistas();
    
   
    if(carregarMedalhas().Error){
        console.log('algo deu errado no carregamento da table medalhas')
    }
    else if(getAtletasMedalhistas().Error){
        console.log('algo deu errado no carregamento da table atletas')
    }

}