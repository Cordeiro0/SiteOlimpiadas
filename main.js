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
            alert('Login realizado com sucesso');
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
         //tbody.innerHTML = ''; // Limpa o conteúdo existente
 
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
            if(event.discipline_name === "Football"){
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

/*Parte da API de Medalhas do Brasil*/

window.onload = function CarregarTabelas(){
    carregarMedalhas();
    getAtletasMedalhistas();
   
    if(carregarMedalhas().Error){
        console.log('algo deu errado no carregamento da table medalhas')
    }
    else if(getAtletasMedalhistas().Error){
        console.log('algo deu errado no carregamento da table atletas')
    }

}