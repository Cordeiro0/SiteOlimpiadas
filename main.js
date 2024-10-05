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
         // Fazendo a requisição para a API
         const response = await fetch('https://apis.codante.io/olympic-games/countries');
        
         // Verificando se a resposta foi bem-sucedida
         if (!response.ok) {
             throw new Error('Erro ao carregar o arquivo JSON: ' + response.statusText);
         }
 
         // Convertendo a resposta para JSON
         const data = await response.json();
 
         // Seleciona o corpo da tabela onde os dados serão exibidos
         const tbody = document.getElementById('medals-body');
         if (!tbody) {
             throw new Error('Elemento com ID "medals-body" não encontrado.');
         }
         //tbody.innerHTML = ''; // Limpa o conteúdo existente
 
         // Iterando sobre os resultados e criando as linhas da tabela
         data.data.forEach(result => {  // Assuming data is the correct key from your API response
             const row = document.createElement('tr');
             row.innerHTML = `
                 <td>${result.rank}</td>
                 <td><img src="${result.flag_url}" width="20%" alt="${result.name}"></td>
                 <td>${result.name} </td>
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

window.onload = carregarMedalhas;