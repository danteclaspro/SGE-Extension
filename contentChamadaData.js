const meses = [
    {number:"01", month:"JANEIRO"},
    {number:"02", month:"FEVEREIRO"},
    {number:"03", month:"MAR\u00C7O"},
    {number:"04", month:"ABRIL"},
    {number:"05", month:"MAIO"},
    {number:"06", month:"JUNHO"},
    {number:"07", month:"JULHO"},
    {number:"08", month:"AGOSTO"},
    {number:"09", month:"SETEMBRO"},
    {number:"10", month:"OUTUBRO"},
    {number:"11", month:"NOVEMBRO"},
    {number:"12", month:"DEZEMBRO"}    
];

function verificaQuantidade(tipo) {
    
    let elements = document.getElementsByClassName('diaF');        

    if (tipo == 2 && elements.length > 6) {    
        document.getElementById('aviso').style.display = "block";             
    } else if (tipo == 3 && elements.length > 22) {
        document.getElementById('aviso').style.display = "block";
    } else {
        document.getElementById('aviso').style.display = "none";        
    }    
    
}

function addDate(dia, id, mes, tipo) {    
       
    let cell = document.getElementById("apos");                  
    if (dia === "" || dia < 1 || dia > 31) {
        alert("Por favor, insira um dia v\u00E1lido entre 1 e 31.");
        return;
    }
    if (dia > 31) {
        return;
    }
    if (tipo == 2) {
        dia = String(dia).padStart(2, '0');        
        dia = dia.concat("/"+meses[mes].number);        
    } else {
        dia = String(dia).padStart(2, '0');
    }

    let container = document.createElement('div');
    container.style.display = "flex";
    container.style.flexDirection = "column";    
    container.style.alignItems = "center";
    container.style.marginBottom = "1px"; 
    container.style.padding = "0px";                                 
    
    let newCell = document.createElement('input');                           
    newCell.style.boxSizing = "border-box";
    newCell.type = "text";
    newCell.className = 'diaF';    
    newCell.maxLength = 5;            
    newCell.value = dia;  
    if (tipo == 2) {newCell.style.width = "92px"}
    if (tipo == 3) {newCell.style.width = "44px"}
    else {newCell.style.width = (dia.length+1) + 'ch'}    
    newCell.style.minWidth = "27px";
    newCell.style.textAlign = "center";    

    let styles = {
        outline: "#000000 solid 1px",
        textAlign: "center",
        backgroundColor: "#ffffff",                 
        fontSize: "small",
        padding: "1px 1px 1px 1px",
        cursor: "pointer"
    }

    let texto = document.createElement('div');
    texto.style.width = "95%";            
    texto.style.display = "none";
    texto.style.flexDirection = "column";    
    texto.style.justifyContent = "center";
    texto.style.alignItems = "center";
    texto.style.writingMode = "vertical-lr";
    texto.style.textOrientation = "upright";             
    texto.style.textAlign = "center";
    texto.style.margin = "1px";
    texto.style.border = "solid 1px grey";
    texto.style.borderRadius = "1px";

    let dropdown = document.createElement('div');
    dropdown.style.display = "none";
    dropdown.style.position = "absolute";
    dropdown.style.backgroundColor = "#f0fff0";
    dropdown.style.zIndex = "1";

    const optionsData = [
        { text: "Nenhum", value: "" },
        { text: "Dia Escolar", value: "DIA ESCOLAR" },
        { text: "Férias", value: "FÉRIAS" },
        { text: "Greve", value: "GREVE" },
        { text: "Paralisação", value: "PARALISAÇÃO" },
        { text: "Recesso", value: "RECESSO" },
        { text: "Assembléia", value: "ASSEMBLÉIA" },
        { text: "Pleito Eleitoral", value: "PLEITO ELEITORAL" },
        { text: "Sábado Letivo", value: "SÁBADO LETIVO" }
    ];

    const options = optionsData.map(data => {
        const option = document.createElement('div');

        option.innerHTML = data.text;
        option.value = data.value;

        Object.assign(option.style, styles);

        option.onclick = function () {
            texto.innerHTML = data.text;

            if (data.value === "") {
                texto.style.display = "none";
            } else {
                texto.style.display = "flex";
            }

            newCell.id = data.value;
            dropdown.style.display = "none";
        };

        return option;
    });

    options.forEach(opt => dropdown.appendChild(opt));  

    let moduloContainer = document.createElement('div');
    moduloContainer.style.display = "flex";
    moduloContainer.style.flexDirection = "line";
    moduloContainer.style.alignItems = "center";
    moduloContainer.style.marginBottom = "1px"; 
    moduloContainer.style.padding = "0px";                                     

    let textos = ["1\u00BA","2\u00BA","3\u00BA","4\u00BA"];
    let titulos = ["1\u00BA hor\u00E1rio", "2\u00BA hor\u00E1rio", "3\u00BA hor\u00E1rio", "4\u00BA hor\u00E1rio"];

    let modulosTexto = textos.map((texto, i) => {
        let moduleSpan = document.createElement('span');
        moduleSpan.innerText = texto;
        moduleSpan.title = titulos[i];
        Object.assign(moduleSpan.style, {
            width: "100%",
            textAlign: "center",
            title: "1º horário",
            width: "20px",
            border: "solid 1px grey",     
            justifyContent: "center",
            alignSelf: "center",
        });

        return moduleSpan;        
    });

    let [moduleText1, moduleText2, moduleText3, moduleText4] = modulosTexto;
    
    let textosIntegral = ["M","T"];
    let titulosIntegral = ["Turno matutino", "Turno vespertino"];

    let integralContainer = document.createElement('div');
    integralContainer.style.display = "flex";
    integralContainer.style.flexDirection = "line";
    integralContainer.style.alignItems = "center";
    integralContainer.style.marginBottom = "1px"; 
    integralContainer.style.padding = "0px";   
    
    let integralTexto = textosIntegral.map((texto, i) => {
        let moduleSpan = document.createElement('span');
        moduleSpan.innerText = texto;
        moduleSpan.title = titulosIntegral[i];
        Object.assign(moduleSpan.style, {
            width: "100%",
            textAlign: "center",
            title: "1º horário",
            width: "20px",
            border: "solid 1px grey",     
            justifyContent: "center",
            alignSelf: "center",
        });

        return moduleSpan;        
    });

    let [integralText1, integralText2] = integralTexto;

    let button1 = document.createElement('button');
    button1.innerHTML = "-";
    button1.style.width = "100%";
    button1.textAlign = "center";
    button1.title = "Excluir este dia";
    button1.onclick = function() {                
        cell.removeChild(container);
        if(tipo == 2 || tipo == 3) {
            verificaQuantidade();
        }
    }; 
    let button2 = document.createElement('button');
    button2.innerHTML = "*";
    button2.style.width = "100%";
    button2.textAlign = "center";
    button2.title = "Adicionar legenda a este dia";
    button2.onclick = function() {
        dropdown.style.display = dropdown.style.display === "none" ? "block" : "none";                
    };   

    if (tipo == 2) {
        moduloContainer.appendChild(moduleText1);
        moduloContainer.appendChild(moduleText2);
        moduloContainer.appendChild(moduleText3);
        moduloContainer.appendChild(moduleText4);
    }  
    
    if (tipo == 3) {
        integralContainer.appendChild(integralText1);
        integralContainer.appendChild(integralText2);
    } 

    container.appendChild(newCell);    
    container.appendChild(moduloContainer);
    container.appendChild(integralContainer);
    container.appendChild(button1);
    container.appendChild(button2);
    container.appendChild(texto);
    container.appendChild(dropdown);    

    cell.appendChild(container);   
    if (document.getElementById(id).value < 31) {        
        document.getElementById(id).value++;
    }

     if (tipo == 2 || tipo == 3) {
        verificaQuantidade(tipo);
    }
}

function addMonth(mes) {
    if (mes === "") {
        alert("Por favor, selecione um valor para o m\u00EAs.");
        return;
    }
    if (mes != null) {
        let element = document.getElementById('mesN');        
        element.innerHTML = meses[mes].month;
        element.style.textAlign = "center";
    }
}

function cleanTable(id) {
    let elements = [];                       
    id.forEach((element) => {                
        elements.push(document.getElementById(element));                
    });                 
                                
    if (confirm('Isso ir\u00E1 remover todos os dias adicionados. Deseja prosseguir?')) {
        elements.forEach ((element) => {
            element.innerHTML = "";
        });                
    } else {
        return;
    }           
}

function finaliza() {

    let TipoModulo = 0;
    let CodTurno = "";
    let CodTurma = "";
    
    document.querySelectorAll('input[name="COD[]"]:checked').forEach((element) => {
        CodTurno += "&COD[]=" + element.value;
    });
    
    document.querySelectorAll('input[name="Cod[]"]:checked').forEach((element) => {
        CodTurma += "&Cod[]=" + element.value;
    });

    const ordenacao = document.querySelector('select[name="ORD"]').value;

    const url = `https://page.php?ano=${document.querySelector('input[name="YEA"]').value}&COD1=${document.querySelector('select[name="Reg"]').value}&COD2=${document.querySelector('select[name="COD3"]').value}&COD4=${document.querySelector('select[name="COD5"]').value}${CodTurno}${CodTurma}&Sabado=&DataIni=&modulo=${TipoModulo}&ordenacao=${ordenacao}`;

    return url;
}