function alteraBotao(botao, title, status, image) {    
    if (status == true) {             
        botao.title = title;
        botao.style.opacity = '0.8';
        botao.style.pointerEvents = 'none';
        botao.style.backgroundImage = `url(${image})`;        
    } 
    if (status == false) {
        botao.title = title;
        botao.style.opacity = '1';
        botao.style.pointerEvents = 'auto';
        botao.style.backgroundImage = `url(${image})`;
    }        
} 

async function getSetCodes(url) {

    let codes = [];    
    let currentDoc = await preparePage(url); 
    
    function getParams(doc) {
        doc.querySelectorAll('a[class="DataLink"][href*="COD"]').forEach(el => {
            
            let tipo = el.innerText.charAt(0);            

            if (tipo === 'F') {
                if (el.innerText.charAt(1) === 'J') {
                    tipo = 0;
                } else {
                    if (el.innerText.charAt(3) === 'P') {                    
                        if (el.innerText.charAt(5) === '3') {                        
                            tipo = 1;                        
                        } else {                        
                            tipo = 0;
                        }                        
                    } else if (el.innerText.charAt(3) == 'A') {
                        tipo = 1;
                    } else {
                        tipo = 0;
                    }
                }                
            }

            if (tipo === 'I') {                
                if (el.innerText.charAt(6) === 'I') {
                        tipo = 2
                } else {
                    tipo = 0;
                }; 
            }                     
        
            let tempUrl = new URL(el.href);            
            let element = {
                code: tempUrl.searchParams.get('COD'),
                name: el.innerText,
                type: tipo                
            }                           
            codes.push(element);
        });
    }     

    getParams(currentDoc);

    let nextPageLink = [...currentDoc.querySelectorAll('a.NavigatorLink[href*="frequency"]')]        
        .find(link => /Pr[ó?]xima/i.test(link.textContent)); 

    while(nextPageLink) {         
        currentDoc = await preparePage(nextPageLink.href);        
        getParams(currentDoc);
        nextPageLink = [...currentDoc.querySelectorAll('a.NavigatorLink[href*="frequency"]')]        
        .find(link => /Pr[ó?]xima/i.test(link.textContent));        
    } 
    
    if (codes.length > 0) {
        chrome.storage.local.set({ turmaCodes: codes });              
    }
    
}

async function mergePdfPages (pdfDocList) {
    const mergedDoc = await PDFLib.PDFDocument.create();

    for (let i = 0; i < pdfDocList.length; i++) {
        const pageDoc = await PDFLib.PDFDocument.load(pdfDocList[i]);
        const [copiedPage] = await mergedDoc.copyPages(pageDoc, [0]);
        mergedDoc.addPage(copiedPage);
    }

    const finalPdfBytes = await mergedDoc.save();
    return finalPdfBytes;        
}
 
async function openPdf(bytes) {
    const blob = new Blob([bytes], { type: 'application/pdf' });
    const urlBlob = URL.createObjectURL(blob);     
    alert('O documento será aberto em uma nova guia. Sempre confira todas as informações antes de utilizá-lo.');
    window.open(urlBlob, '_blank');
}
 
function formataData(data) {    
    let ano = data.getFullYear();
    let mes = data.getMonth();
    mes = (mes+1);
    let dia = data.getDate();
    if (dia < 10 ) {
        dia = '0'+dia;
    }
    if (mes < 10) {
        mes = '0'+mes;
    }
    const dataFormato = `${dia}/${mes}/${ano}`;
    return dataFormato;
}

async function resetForm(form) {
    const campos = form.getFields();
    for (const campo of campos) {
        if (campo instanceof PDFLib.PDFTextField) {
            campo.setText('');
        }
    }
}

function hexToRgb(hex) {
    let bigint = parseInt(hex.slice(1), 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;
    return { r, g, b };
}

function verificaForms() {
    let anoForm = document.getElementById('year').value;    
    let etapaForm = document.getElementById('current').value;
    let ensinoForm = document.getElementById('type').value;
    let turmaForm = document.getElementById('class').value;
    let situaForm = document.getElementById('enrolled').value; 
    let codEsc = document.getElementById('school').value;            
    let codRegional = document.getElementById('region').value;                                                                
    
    if (anoForm && etapaForm && ensinoForm && turmaForm && situaForm && codEsc && codRegional) {      
        let campos = {ano: anoForm, etapa: etapaForm, ensino: ensinoForm, turma: turmaForm, situacao: situaForm, escola: codEsc, regional: codRegional};                   
        return campos;
    } else {
        return false;
    }
}

async function preparePage(page) {
    const response = await fetch(page);
    const arrayBuffer = await response.arrayBuffer(); 
    const decoder = new TextDecoder('iso-8859-1');
    const htmlText = decoder.decode(arrayBuffer);
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, 'text/html');
    return doc;
}

async function prepareLinkByDoc(doc, link) {      

    let linkUrl = new URL(link);    
    let params = linkUrl.searchParams;    
 
    if (params) {            
        params.forEach((par, par1) => {                         
            let val;
            let element = doc.querySelectorAll(`[id="${par1}"], [name="${par1}"]`);            
            element.forEach(el => {                
                val = el.value;                
            });            
            linkUrl.searchParams.set(par1, val);            
        });
        return linkUrl;
    } else {
        return null;
    }      
}
  
function addTabIcon(doc) {    
    const pageHead = doc.head;
    const icon = doc.createElement("link");
    icon.rel="icon";
    icon.type="image/x-icon"
    icon.href= chrome.runtime.getURL("assets/icon.png");
    pageHead.appendChild(icon);
}

async function getDataNomes(turma, nomeTurma) {
    let alunos = [];
    const docHtml = await preparePage(`https://page.php?class=${turma}`);
    const elementTd = Array.from(docHtml.getElementsByTagName('td'));       
    elementTd.forEach((element, idx) => {        
        if (["status1","status2","status3","status4","status5","status5"].includes(element.innerText.trim())) {                       
            if (idx > 0 && elementTd[idx-1].innerText.trim() === "status6") {                
            } else {                        
                let student = {
                    class: nomeTurma,                
                    name: elementTd[idx-2].innerText,
                    code: elementTd[idx-3].innerText,
                    number: elementTd[idx-4].innerText,
                };  
                alunos.push(student);
            }
        } 
    });           
    return alunos;     
}

 async function drawTextElement(pdfDoc, x, y, fontSize, center, space, text, trim) {
    if (!text || typeof text !== 'string') {
        throw new Error("Invalid text: must be a non-empty string");
    }    
    if (trim) {
        text = text.substring(0, trim);
    }

    const page = pdfDoc.getPages()[0];
    const { width } = page.getSize();      

    let font = await pdfDoc.embedFont(PDFLib.StandardFonts.Helvetica);
    const lines = text.split('\n');
    let currentY = y; 

    for (const line of lines) {
        const lineWidth = font.widthOfTextAtSize(line, fontSize);

        let setX;
        if (center) {
            setX = (width - lineWidth) / 2;
        } else {
            setX = x;
        }
        
        page.drawText(line, {
            x: setX,
            y: currentY,
            size: fontSize,
            font: font,
            color: PDFLib.rgb(0, 0, 0),
        });

        let spaceValue;
        if (space) {
            spaceValue = space;
        } else {
            spaceValue = 10;
        }
        currentY -= fontSize + spaceValue;
    }
}  

async function pdfOffset(pdfDoc, xValue, yValue) {    
    xValue = xValue || 0;
    yValue = yValue || 0;                 
   
    let pages = pdfDoc.getPages();            
    
    pages.forEach(page => {
        page.translateContent(xValue, yValue);            
    });  

    const pdfDocBytes = await pdfDoc.save();    
    return pdfDocBytes;
}

 function travaDestrava(id, opcao, textoOrigin) {
    let elemento = document.getElementById(id);
    if (opcao == true) {           
        elemento.setAttribute('disabled', true);
        elemento.innerText = 'CARREGANDO...';
    } else {
        elemento.removeAttribute('disabled');
        elemento.innerText = textoOrigin;
    }
}