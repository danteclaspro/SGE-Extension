let dadosRecuperados;

let escolaD, legalD, enderecoD, numeroD, complementoD, bairroD, municipioD, ufD, cepD, telefoneD, emailD;

document.addEventListener('DOMContentLoaded', function() {
    iniciar();
    const botaoSalvar = document.getElementById('saveButton');
    if (botaoSalvar) {
        botaoSalvar.addEventListener('click', function() {                
            if (validateForm()) {
                saveFormData();
            } else {
                alert("Por favor, preencha todos os campos.");
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {  
    const botaoCancelar = document.getElementById('cancelButton');
    if (botaoCancelar) {
        botaoCancelar.addEventListener('click', function() {                
            window.close();
        });
    }
});

async function loadData() {    
    return new Promise((resolve, reject) => {
        chrome.storage.local.get('dadosEscola', (result) => {
            if (chrome.runtime.lastError) {
                console.error("Erro ao carregar os dados:", chrome.runtime.lastError);
                reject(chrome.runtime.lastError);                
            } else {
                dadosRecuperados = result.dadosEscola || {};
                resolve(dadosRecuperados);
            }
        });
    });      
}

function preencheForms() {    
    if (dadosRecuperados) {
        escolaD.value = dadosRecuperados.escola;
        legalD.value = dadosRecuperados.legal;
        enderecoD.value = dadosRecuperados.endereco;
        numeroD.value = dadosRecuperados.numero;
        bairroD.value = dadosRecuperados.bairro;
        municipioD.value = dadosRecuperados.municipio;
        complementoD.value = dadosRecuperados.complemento;
        ufD.value = dadosRecuperados.uf;
        cepD.value = dadosRecuperados.cep;
        telefoneD.value = dadosRecuperados.telefone;
        emailD.value = dadosRecuperados.email;        
    }    
}

function validateForm() {                 
  if (escolaD.value && legalD.value && enderecoD.value && numeroD.value &&
    complementoD.value && bairroD.value && municipioD.value && ufD.value &&
    cepD.value && telefoneD.value && emailD.value) {    
    return true;
  } else {
    return false;
  }
}

async function saveFormData() {     
    
    const dadosEscola = {
        escola: escolaD.value,
        legal: legalD.value,
        endereco: enderecoD.value,
        numero: numeroD.value,
        complemento: complementoD.value,
        bairro: bairroD.value,
        municipio: municipioD.value,
        uf: ufD.value,
        cep: cepD.value,
        telefone: telefoneD.value,
        email: emailD.value,
    };

    Object.assign(dadosRecuperados, dadosEscola);

    chrome.storage.local.set({ dadosEscola: dadosRecuperados }, () => {
        if (chrome.runtime.lastError) {
            console.error("Erro ao salvar os dados:", chrome.runtime.lastError);
            alert('Ocorreu um erro inesperado. Por favor, recarregue a página e tente novamente');
        } else {
            console.log("Dados salvos com sucesso!");
            alert('Os dados foram salvos com sucesso');
            window.close();
        }   
  });
}

async function iniciar() {    
    let boots = document.createElement('link');
    boots.href = chrome.runtime.getURL('bootstrap.min.css');
    boots.rel = "stylesheet";
    document.head.appendChild(boots);

    let styleCss = document.createElement('style');
    styleCss.innerHTML = `
        body {
            background-color: #f0fff0;
            font-family: Arial, Helvetica, Sans-serif;
            font-size: 12px;
            color: #000;
            padding: 0px 5px 5px 5px;
            margin: 0px 5px 5px 5px;
        }
        #topo {       
            border-bottom: 2px solid #000;
            height: 50px;
        }
        #topo h1 {
            position: absolute;
            right: 20px;
            top: 10px;
            margin: 10px;
            text-align: right;
            font-size: 18px;
        }     
        .table {
            margin: 10px auto;            
            max-width: 80%;
        }      
        .form-control {
            font-size: 15px;
        }       
        .custom-col {
            padding: 5px;
        }
        button {
            margin: 5px;
        }        
    `
    document.head.appendChild(styleCss);


    if(document.getElementById('cadastro')) {        
        recolheElementos();
        await loadData();
        preencheForms();
    }
}

function recolheElementos() {         
    escolaD = document.getElementById('escola');
    legalD = document.getElementById('legal');
    enderecoD = document.getElementById('endereco');
    numeroD = document.getElementById('numero');
    complementoD = document.getElementById('complemento');
    bairroD = document.getElementById('bairro');
    municipioD = document.getElementById('municipio');
    ufD = document.getElementById('uf');
    cepD = document.getElementById('cep');
    telefoneD = document.getElementById('telefone');
    emailD = document.getElementById('email');             
}