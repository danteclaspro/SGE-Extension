 /*Desenvolvido por Daniel Borges Gomes Pereira - 1126308*/

const ListaChamada = {   
    diasDatas: [],
    month: null, 
    dataAfastados: [],      

    addLink: async function() {          
        const currentUrl = window.location.href;    
        const pattern = /https:\/\/page\.php/; // shadowed
        
        if (pattern.test(currentUrl)) {           
            addTabIcon(document);
            let verBotao = document.getElementsByName("ButtonS")[0];
            if (verBotao) {
                verBotao.value = "GERAR RELATÓRIO SEM DATAS";
                this.addNewMenu();
                this.injectScript('contentChamadaData.js');
            }              
        }
    },
  
    addNewMenu: function() {
        const container = document.createElement('div');              

        container.innerHTML =`
            <div id="conteudoN"  class="NativeFormTABLE">
                <p class="titulo">&nbsp;</p>
                <p>&nbsp;</p>
                <font class="NativeHeaderFont">Cabeçalho</font>
                <div style="background-color: #dddddd; padding: 5px;">
                    <a class="NativeFieldCaptionTD">Tipo:</a>
                    <select class="NativeSelect" id="tipoIn">
                        <option disabled selected hidden style="color: grey;">Selecione</option>
                        <option value=1>Diário</option>
                        <option value=2>Módulo</option>
                        <option value=3>Integral</option>
                    </select>
                    <span style="margin-right: 10px"></span>
                    <a class="NativeFieldCaptionTD">Mês:</a>
                    <select class="NativeSelect" id="mesIN" disabled>
                        <option value disabled selected hidden style="color: grey;">Selecione</option>
                        <option value=0>JANEIRO</option>
                        <option value=1>FEVEREIRO</option>
                        <option value=2>MARÇO</option>
                        <option value=3>ABRIL</option>
                        <option value=4>MAIO</option>
                        <option value=5>JUNHO</option>
                        <option value=6>JULHO</option>
                        <option value=7>AGOSTO</option>
                        <option value=8>SETEMBRO</option>
                        <option value=9>OUTUBRO</option>
                        <option value=10>NOVEMBRO</option>
                        <option value=11>DEZEMBRO</option>
                    </select>                    
                    <button id="mesAdd" disabled title="Adicionar mês" onclick="addMonth(document.getElementById('mesIN').value)">+</button>
                    <a class="NativeFieldCaptionTD" style="margin-left: 10px;">Dia:</a>
                    <input class="NativeInput" id="diaN" min="1" max="31" placeholder="Dia" type="number" style="width: 60px">
                    <button id="diaAdd" title="Adicionar dia" disabled onclick="addDate(document.getElementById('diaN').value, document.getElementById('diaN').id, document.getElementById('mesIN').value, document.getElementById('tipoIn').value)">+</button>
                    <button title="Limpar todas as entradas" id="botaoLimpar" style="margin-left: 10px" onclick="cleanTable(['apos','mesN']); clear()">Limpar</button>                
                    <input class="NativeInput" type="checkbox" id="colunaF" style="height: 15px; width: 15px; margin-left: 15px; self-align: center">
                    <a class="NativeFieldCaptionTD" style="">Coluna de faltas</a>
                    <input class="NativeInput" type="checkbox" id="riscarA" style="height: 15px; width: 15px; margin-left: 15px; self-align: center">
                    <a class="NativeFieldCaptionTD" style="">Riscar alunos afastados/remanejados</a>
                    

                    <div style="padding: 10px">          
                        <table style=" padding: 10px; outline: #000000 solid 1px; text-align: center; background-color: #ffffff; margin-top: 10px;  font-size: small;">
                            <tr> 
                                <td colspan="2" style="text-align: start;"> 
                                    <div style="margin: 2px 2px 2px 2px;">                
                                        <a id="regionalN"></a>
                                        <br>
                                        <a id="escolaN"></a>
                                        <br>
                                        <span>Listagem de Apuração Diária de Frequência</span>
                                        <br>
                                        <span>Ano de Referência: <a id="anoN"></a></span>                                 
                                    </div>
                                </td>
                            </tr>              
                            <tr>
                                <br>
                                <td style="width: 150px; height: 20px;"></td>    
                                <td id="mesN" style="background-color: #dddddd; width: 400px; height: 20px; outline: #000000 solid 1px; text-align: center;"></td>
                            </tr>
                            <tr id="insercao">
                                <td style="width: 150px; height: 20px; outline: #000000 solid 1px; text-align: center;">Listagem</td>    
                                <td id="apos" style="white-space: nowrap; background-color: #ffffff; min-width: 400px; min-height: 20px; outline: #000000 solid 1px; display: flex; flex-direction: row;"></td>                
                            </tr>            
                        </table>   
                    </div>
                    <div id="aviso" style="display: none">
                        <p style="color: red; padding: 5px;">Atenção: a formatação da listagem de apuração de frequência do tipo selecionado não comporta mais do que a quantidade de dias inseridos.</p>
                    </div>
                    <div id="aviso2" style="display: none">
                        <p style="color: red; padding: 5px;">Atenção: não é possível anular linhas de alunos de turmas não numeradas.</p>
                    </div>
                    <div style="text-align: center;">
                        <button id="finalizaB" class="NativeButton" style="align-self: center">GERAR RELATÓRIO COM DATAS</button>
                    </div>
                    
                </div>
            </div>
        `;

        const targetRow = document.querySelector('td[align="justify"][colspan="2"]');
        targetRow.removeAttribute('colspan');
        const newTd = document.createElement('td');
        newTd.style.verticalAlign = "top";
        newTd.appendChild(container);
        targetRow.parentNode.appendChild(newTd);

        document.getElementById("regionalN").innerHTML = document.getElementsByName("R")[0].options[document.getElementsByName("s")[0].selectedIndex].text;
        document.getElementById("escolaN").innerHTML = document.getElementsByName("COD")[0].options[document.getElementsByName("COD")[0].selectedIndex].text;
        document.getElementById("anoN").innerHTML = document.getElementsByName("s")[0].value;      
        
        document.getElementById('tipoIn').addEventListener('change', async function() {
            ListaChamada.enableDisable('mesIN',true);
        });
        document.getElementById('mesIN').addEventListener('change', async function() {
            ListaChamada.enableDisable('mesAdd',true);
        });
        document.getElementById('mesAdd').addEventListener('click', async function() {
            ListaChamada.enableDisable('diaAdd',true);
        });
        document.getElementById('riscarA').addEventListener('change', async function() {                       
            var typeList = document.getElementsByName('s')[0].value;
            var thisElement = document.getElementById('riscarA').checked;              
            if (thisElement && typeList < 2) {
                document.getElementById('aviso2').style.display = 'block';
            } else {
                document.getElementById('aviso2').style.display = 'none';
            }
            ListaChamada.dataAfastados = await ListaChamada.getDataStatus();
        });
        document.getElementById('finalizaB').addEventListener('click', async function() { 
            let tipo = document.getElementById('tipoIn').value;
            var riscar = document.getElementById('riscarA').checked;
            ListaChamada.fillPdf(tipo, riscar);
        });
        document.getElementById('botaoLimpar').addEventListener('click', async function() { 
            ListaChamada.clear();
        });       
        
    },
    
    enableDisable: async function(id, liga) {
        if (liga == true) {
            document.getElementById(id).removeAttribute('disabled');
        } else {
           document.getElementById(id).setAttribute('disabled'); 
        }
    },

    updateData: async function() {    
        let elements = document.getElementsByClassName('diaF');
        let monthElement = document.getElementById('mesN');  
        
        if(monthElement.innerHTML.length > 1) {       
        month = monthElement.innerHTML;       
        if (elements.length > 0) {
                Array.from(elements).forEach(index => {
                    let element = {
                        date: index.value,
                        obs: index.id
                    }
                    this.diasDatas.push(element);
                });
            } else {
                return false;
            }
        } else {
            return false;
        }  

        return true;
    },

    getDataStatus: async function() {
      travaDestrava('finalizaB', true);
      const classCodes = document.getElementsByName('Cod[]');      
      let codesT = [];
      let codesTSpec = [];

      Array.from(classCodes).forEach(index => {
        codesT.push(index.value);    
      }); 

      for(let [index, value] of codesT.entries()) {        
        const docHtml = await preparePage(`https://page.php?COD=${value}`);
        const elementTd = Array.from(docHtml.getElementsByTagName('td'));        
        let noAft = true;
        elementTd.forEach((element, idx) => {
            if(element.innerText.trim() == "A1" || element.innerText.trim() == "A2" || element.innerText.trim() == "A3" || element.innerText.trim() === "A4") {
                let ind = element.innerText.trim() === "A5" ? idx-3 : idx-4;
                let student = {
                    class: value,
                    number: elementTd[ind].innerText
                };                 
                let existClass = codesTSpec.find(item => item.class === student.class);
                if (existClass) {
                    existClass.numbers.push(student.number);                    
                } else {
                    codesTSpec.push({
                        class: student.class,
                        numbers: [student.number]
                    });                    
                } 
                noAft = false;                              
            } 
        }); 
        if (noAft == true) {
            codesTSpec.push({
                class: value,
                numbers: null
            }); 
        }       
      }            
      travaDestrava('finalizaB', false,'GERAR RELATÓRIO COM DATAS');             
      return codesTSpec;      
    },    

    fillPdf: async function(tipo, riscar) {          
        travaDestrava('finalizaB', true);        
        let colunaCheck = document.getElementById('colunaF').checked;        
        let riscarCheck = document.getElementById('riscarA').checked;                  
        let upData = await ListaChamada.updateData();     

        if (!upData) {
            alert("Por favor preencha os dados do mês e dos dias no cabeçalho.");
            return;
        }        

        let urlN = ListaChamada.finaliza();

        const pdfBytes = await fetch(urlN).then(res => res.arrayBuffer());
        const pdfDoc = await PDFLib.PDFDocument.load(pdfBytes);
        let dataAft;

        if (riscar) {
            dataAft = await this.getStudentLine(pdfBytes, this.dataAfastados);
        }
        
        let pdfDoc_a = undefined;
        let x = 319.8;    
        let xGrey = 319.5;
        let linesY = 41;
        let y = 125.05;  
        let finalX;        
        let centerX;

        if (tipo == 1) {
            finalX = 319.5 + (this.diasDatas.length * 16);
            centerX = 295.5 + ((finalX - 319.5) / 2);

            if (colunaCheck == true) {
                finalX = finalX + 53; 
                centerX += 26;
            }
            this.drawFigure(pdfDoc, 320, 124, 500, 420, "#ffffff");   
            
            for (let i = 0; i < (this.diasDatas.length / 2); i++) {
                this.drawFigure(pdfDoc, xGrey, 125, 16, 397, '#e3e3e3');        
                xGrey += 32;
            }

            for (let i = 0; i < linesY; i++) {
                this.drawLine(pdfDoc, 319.5, y, finalX, y, 0.15, '#000000');
                if (i > 37) {
                    y += 11.2;
                } else {
                    y += 10.15; 
                }        
            }

            x = 319.8;
            for (let i = 0; i < (this.diasDatas.length + 1); i++) {
                if (i == 0) {            
                    this.drawLine(pdfDoc, x, 125, x, 533.2, 0.8, '#000000');    
                } else if (i == this.diasDatas.length) {
                    if (colunaCheck == true) {
                        this.drawLine(pdfDoc, x, 125, x, 522, 0.8, '#000000');
                        x += 53;
                        this.drawLine(pdfDoc, x, 125, x, 533.2, 0.8, '#000000');    
                    } else {
                        this.drawLine(pdfDoc, x, 125, x, 533.2, 0.8, '#000000');     
                    }
                } else {           
                    this.drawLine(pdfDoc, x, 125, x, 522, 0.8, '#000000');            
                } 
                x += 16;
            }
            
            if (riscarCheck) {  
                x = 70.5;        
                y = 516;                                                   
                this.drawLineSpecific(pdfDoc, x, finalX, 1.2, '#000000', dataAft);                
            }

            x = 322;
            
            this.diasDatas.forEach(index => {
                this.drawElement(pdfDoc, x, 512.2, 11, false, null, index.date, false);        
                if (index.obs.length > 1) {
                    let color = '#ffffff';
                    if (this.diasDatas.indexOf(index) % 2 == 0) {
                        color = '#e3e3e3';
                    }
                    // tarja data
                    this.drawFigure(pdfDoc, x - 1.8, 126, 15, 383, color);
                    // observação data
                    this.drawElement(pdfDoc, x + 2.2, 495, 10, false, null, index.obs, true);
                }       
                x += 16;
            });

            if (colunaCheck == true) {            
                this.drawElement(pdfDoc, x + 2, 512.2, 9, false, null, "Faltas/Mês", false);
            }                         

            this.drawFigure(pdfDoc, 320.5, 522.26, finalX - 321, 10.6, "#e3e3e3");         
            this.drawElement(pdfDoc, centerX, 523.5, 11, false, null, month, false);
        } 

        if (tipo == 2) {

            finalX = 319.5 + (this.diasDatas.length * 64);
            centerX = 295.5 + ((finalX - 319.5) / 2);

            if (colunaCheck == true) {
                finalX = finalX + 52;    
                centerX += 26;
            }

            this.drawFigure(pdfDoc, 320, 124, 500, 420, "#ffffff");   
            
            for (let i = 0; i < (this.diasDatas.length * 2); i++) {                 
                this.drawFigure(pdfDoc, xGrey, 125, 16, 397, '#e3e3e3');        
                xGrey += 32;
            }
           
            for (let i = 0; i < (linesY+1); i++) {
                this.drawLine(pdfDoc, 319.5, y, finalX, y, 0.15, '#000000');
                if (i > 37) {
                    y += 11.2;
                } else {
                    y += 10.15; 
                }        
            }
            
            x = 319.8;
            for (let i = 0; i < ((this.diasDatas.length * 4) + 1); i++) {
                if (i == 0) {             
                    this.drawLine(pdfDoc, x, 125, x, 544.4, 1.2, '#000000');    
                } else if (i%4 == 0) {
                    if (i == this.diasDatas.length * 4) {
                        if (colunaCheck == true) {                                  
                            this.drawLine(pdfDoc, x, 125, x, 533.2, 1.2, '#000000');
                            x += 52;
                            this.drawLine(pdfDoc, x, 125, x, 544.4, 1.2, '#000000');    
                        } else {                                                
                            this.drawLine(pdfDoc, x, 125, x, 544.4, 1.2, '#000000');     
                        }
                    }
                    this.drawLine(pdfDoc, x, 125, x, 533.2, 1.2, '#000000');
                } else {                               
                    this.drawLine(pdfDoc, x, 125, x, 522, 0.8, '#000000');
                } 
                x += 16;
            }

            if (riscarCheck) {  
                x = 70.5;        
                y = 516;                                                     
                this.drawLineSpecific(pdfDoc, x, finalX, 1.2, '#000000', dataAft);                
            }

            x = 339;
            
            this.diasDatas.forEach(index => {
                this.drawElement(pdfDoc, x, 523.2, 11, false, null, index.date, false);        
                let modulos = ["1\u00BA","2\u00BA","3\u00BA","4\u00BA"];
                let i = x-16;
                modulos.forEach((mod) => {
                    this.drawElement(pdfDoc, i, 512.5, 11, false, null, mod, false); 
                    i+=16;       
                });
                if (index.obs.length > 1) {
                    let color = '#ffffff';
                    if (this.diasDatas.indexOf(index) % 2 == 0) {
                        color = '#e3e3e3';
                    }                    
                    this.drawFigure(pdfDoc, x-18.5, 125.3, 62.6, 385.15, color);
                    this.drawElement(pdfDoc, x+9, 495, 10, false, null, index.obs, true);
                }       
                x += 64;
            });

            if (colunaCheck == true) {            
                this.drawElement(pdfDoc, x-16, 524, 9, false, null, "Faltas/Mês", false);
            }        
            
            this.drawFigure(pdfDoc, 320.5, 533.4, finalX - 320.9, 10.6, "#e3e3e3");         
            this.drawElement(pdfDoc, centerX, 534.6, 11, false, null, month, false);                        

        }
       
        if (tipo == 3) {

            let oSt = -40;            
            let pdfDocBytes = await pdfOffset(pdfDoc, oSt, 0);
            pdfDoc_a = await PDFLib.PDFDocument.load(pdfDocBytes);
            
            x = 279.8;    
            xGrey = 279.5;                       
            finalX = 264.5 + (this.diasDatas.length * 24);
            centerX = 253.5 + ((finalX - 279.5) / 2);

            if (colunaCheck == true) {
                finalX = finalX + 36;    
                centerX += 26;
            }

            this.drawFigure(pdfDoc_a, 265, 124, 550, 420, "#ffffff");   
            
            xGrey = 264.5;
     
            for (let i = 0; i < (this.diasDatas.length/*era '*2' */); i++) {                 
                this.drawFigure(pdfDoc_a, xGrey, 125, 12, 397, '#e3e3e3');        
                xGrey += 24;
            }

            for (let i = 0; i < (linesY+1); i++) {
                this.drawLine(pdfDoc_a, 264.5, y, finalX, y, 0.15, '#000000');
                if (i > 37) {
                    y += 11.2;
                } else {
                    y += 10.15; 
                }        
            }
            
            x = 264.8;

            for (let i = 0; i < ((this.diasDatas.length * 2) + 1); i++) {
                if (i == 0) {             
                    this.drawLine(pdfDoc_a, x, 125, x, 544.4, 1.2, '#000000');    
                } else if (i%2 == 0) {
                    if (i == this.diasDatas.length * 2) {
                        if (colunaCheck == true) {                                  
                            this.drawLine(pdfDoc_a, x, 125, x, 533.2, 1.2, '#000000');
                            x += 36;
                            this.drawLine(pdfDoc_a, x, 125, x, 544.4, 1.2, '#000000');    
                        } else {                                                
                            this.drawLine(pdfDoc_a, x, 125, x, 544.4, 1.2, '#000000');     
                        }
                    }
                    this.drawLine(pdfDoc_a, x, 125, x, 533.2, 1.2, '#000000');
                } else {                               
                    this.drawLine(pdfDoc_a, x, 125, x, 522, 0.8, '#000000');            
                } 
                x += 12;
            }

            if (riscarCheck) {  
                x = 30.5;        
                y = 516;                                                    
                this.drawLineSpecific(pdfDoc_a, x, finalX, 1.2, '#000000', dataAft);                
            }

            x = 271;
             
            this.diasDatas.forEach(index => {
                this.drawElement(pdfDoc_a, x, 523.2, 11, false, null, index.date, false);        
                let turno = ["M","T"];
                let i = x-4.6;
                turno.forEach((tur) => {
                    this.drawElement(pdfDoc_a, i, 512.5, 11, false, null, tur, false); 
                    i+=13;
                });
                if (index.obs.length > 1) {
                    let color = '#ffffff';
                    if (this.diasDatas.indexOf(index) % 2 == 0) {
                        color = '#e3e3e3';
                    }                    
                    this.drawFigure(pdfDoc_a, x-5.35, 125.3, 22.35, 385.15, color);
                    this.drawElement(pdfDoc_a, x+2, 495, 10, false, null, index.obs, true);
                }       
                x += 24;
            });

            if (colunaCheck == true) {            
                this.drawElement(pdfDoc_a, x-3, 524, 6, false, null, "Faltas/Mês", false);
            }        
            
            this.drawFigure(pdfDoc_a, 265.5, 533.4, finalX - 265.9, 10.6, "#e3e3e3");        
            this.drawElement(pdfDoc_a, centerX, 534.6, 11, false, null, month, false);

        }
                    
        let newPdfBytes = (tipo == 3) ? await pdfDoc_a.save() : await pdfDoc.save();       
        let pdfArray = [];
        pdfArray.push(newPdfBytes);            
        this.mergePdfPages(pdfArray); 
    },

    getStudentLine: async function (pdfBytes, data) {
        const pdfD = pdfjsLib.getDocument({data: pdfBytes});
        const pdfDo = await pdfD.promise;
        const numPages = pdfDo.numPages;
        let dataFinal = [];

        for (let i=0; i<=numPages-1; i++) {
            const pageContent = await pdfDo.getPage(i+1);
            const {items} = await pageContent.getTextContent();
            
            var dataAlunos = data[i];          
            dataAlunos = dataAlunos?.numbers?.map(Number) ?? [];

            dataFinal[i] = {
                class: data[i].class,
                positions: []
            }
            
            if (dataAlunos.length) {            
                items.forEach(({str, transform}) => {
                    if (str.length > 2) {                        
                        var strInt = Number(str.slice(0,2));                        
                        if (dataAlunos.includes(strInt)) {
                            dataFinal[i].positions.push(transform[5]);                            
                        }                        
                    }
                });                
            }
        }
        return dataFinal;
    },

    drawLine: async function(pdfDoc, xS, yS, xE, yE, thi, colorV) {
        const pages = pdfDoc.getPages();
        const colorF = this.hexToRgb(colorV);

        pages.forEach(page => {
            page.drawLine({
                start: { x: xS, y: yS },
                end: { x: xE, y: yE },
                thickness: thi,
                color: PDFLib.rgb(colorF.r/255, colorF.g/255, colorF.b/255),
                opacity: 1,
            }); 
        });    
    },
    // específico para ListaChamada
    drawLineSpecific: async function(pdfDoc, xS, xE, thi, colorV, data) {        
        const pages = pdfDoc.getPages();
        const colorF = this.hexToRgb(colorV);                        
        data.forEach((dado, index) => {
            if (Array.isArray(dado.positions)) {                
                const page = pages[index];                
                dado.positions.forEach(number => {                                        
                    page.drawLine({
                        start: { x: xS, y: (number+4) },
                        end: { x: xE, y: (number+4) },
                        thickness: thi,
                        color: PDFLib.rgb(colorF.r/255, colorF.g/255, colorF.b/255),
                        opacity: 1,
                    }); 
                    
                });         
            }
        });
    },

    drawFigure: async function(pdfDoc, xV, yV, widthV, heightV, colorV) {
        const pages = pdfDoc.getPages();     
        const colorF = this.hexToRgb(colorV);

        pages.forEach(page => {
            page.drawRectangle({
                x: xV,
                y: yV,
                width: widthV,
                height: heightV,
                color: PDFLib.rgb(colorF.r/255, colorF.g/255, colorF.b/255),
            });    
        });    
    },

    drawElement: async function(pdfDoc, x, y, fontSize, center, space, text, vertical = false) {       
        const pages = pdfDoc.getPages();
        const font = await pdfDoc.embedFont(PDFLib.StandardFonts.Helvetica);

        pages.forEach(page => {
            let currentY = y; 
            let currentX = x+4;

        if (vertical) {       
            for (const char of text) {
                const charWidth = font.widthOfTextAtSize(char, fontSize);
                
                page.drawText(char, {
                    x: currentX - (charWidth / 2),
                    y: currentY,
                    size: fontSize,
                    font: font,
                    color: PDFLib.rgb(0, 0, 0),
                });

                currentY -= fontSize + (space || 2);
            }
        } else {        
            const lines = text.split('\n');
            for (const line of lines) {
                const lineWidth = font.widthOfTextAtSize(line, fontSize);

                let setX;
                if (center) {
                    setX = (page.getSize().width - lineWidth) / 2;
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

                currentY -= fontSize + (space || 10);
            }
        }
        });    
    },

    hexToRgb: function(hex) {
        let bigint = parseInt(hex.slice(1), 16);
        let r = (bigint >> 16) & 255;
        let g = (bigint >> 8) & 255;
        let b = bigint & 255;
        return { r, g, b };
    },

    clear: function() {        
        this.diasDatas = [];
        this.month = null;
        this.colunaFaltas = false;            
    },

    //exclusiva de ListaChamada
    mergePdfPages: async function(pdfDocList) {
        const mergedDoc = await PDFLib.PDFDocument.create();
        
        for (let i = 0; i < pdfDocList.length; i++) {
            const pageDoc = await PDFLib.PDFDocument.load(pdfDocList[i]);
            const totalPages = pageDoc.getPageCount();
            const copiedPages = await mergedDoc.copyPages(pageDoc, Array.from({length: totalPages}, (_, index) => index));
            
            copiedPages.forEach(page => {
                mergedDoc.addPage(page); 
            });
        }

        const finalPdfBytes = await mergedDoc.save();
        travaDestrava('finalizaB', false, 'GERAR RELATÓRIO COM DATAS');
        await openPdf(finalPdfBytes);
        ListaChamada.clear();
    },
   
    injectScript: function(filePath) {    
        const script = document.createElement('script');
        script.src = chrome.runtime.getURL(filePath);
        script.onload = function() {
            this.remove();
        };
        (document.head || document.documentElement).appendChild(script);
    },

    finaliza: function() {

        let TipoModulo = 0;
        let CodTurno = "";
        let CodTurma = "";              

        document.querySelectorAll('input[name="s_COD_TURN[]"]:checked').forEach((element) => {
            CodTurno += "&s_COD_TURN[]=" + element.value;
        });
        
        document.querySelectorAll('input[name="CodTurma[]"]:checked').forEach((element) => {
            CodTurma += "&CodTurma[]=" + element.value;
        });
    
        const ordenacao = document.querySelector('select[name="s_ORDENACAO"]').value;
    
        const url = `https://page.php?a=${document.querySelector('input[name="s"]').value}&COD=${document.querySelector('select[name="s"]').value}&COD=${document.querySelector('select[name="COD"]').value}&COD=${document.querySelector('select[name="COD"]').value}${CodTurno}${CodTurma}&S=&D=&m=${TipoModulo}&o=${ordenacao}`;        
        return url;
    },
}

const RelatorioFaltas = {
    
    addLink: function() {    
        const currentUrl = window.location.href;
        const pattern = /https:\/\/page\.php\?ANO=.*&COD=.*&COD=.*&COD=.*$/; //shadowed
        
        if (pattern.test(currentUrl)) {   
            addTabIcon(document);
            const newLink = '<p><a class="NativeDataLink" id="relatorio" href="#">Relatório de faltas</a></p>';
            const paragraphs = document.querySelectorAll('p');
            let target;

            paragraphs.forEach(p => {
                const link = p.querySelector('a');
                if (link && link.getAttribute('href') === 'j.php') {
                    target = p;
                }
            });

            if (target) {                      
                target.insertAdjacentHTML('afterend', newLink);
                document.getElementById('relatorio').addEventListener('click', this.verifyAll);
            } else {
                console.error("Elemento alvo não encontrado.");
            } 
        }
    },

    allData: [],

    modifyOption: function(id, option) {
        let element = document.getElementById(id);
        if (option == 1) {
            element.innerText = 'Carregando';        
            element.disabled = true;
            element.style.opacity = '0.6';
        } else {
            element.innerText = 'Relatório de faltas';
            element.disabled = false;
            element.style.opacity = '1';
        }
    },

    getStudentInfo: function() {
        const parentTd = document.querySelector('input[name="COD"]').closest('td.NativeDataTD');
        const studentElement = parentTd.querySelector('strong');
        const yearInput = document.querySelector('input[name="COD"]');
        const sequenceInput = document.querySelector('input[name="COD"]');
        const schoolInput = document.querySelector('input[name="COD"]');
        
        const year = yearInput ? yearInput.value.trim() : '';
        const sequence = sequenceInput ? sequenceInput.value.trim() : '';
        const codeRME = `${year} ${sequence}`;
        const school = schoolInput ? schoolInput.nextSibling.textContent.trim() : '';         
        const textContent = studentElement ? studentElement.textContent.trim() : '';  

        const parts = textContent.split('-').map(s => s.trim());
        const studentName = parts[1] || 'N/A';

        return {
            school: school,
            name: studentName,
            code: codeRME 
        };
    },

    getDatas: function(doc) {    
        let datas = [];    
        doc.querySelectorAll('input[name^="D"]').forEach(input => {

            if (input.value) {
                let dataFalt = input.value.trim();
                let justify = '';
                let inputName = input.name;
                let suffix = inputName.split('_').pop();
                let justifyElement = doc.querySelector(`select[name="COD_${suffix}"]`);
                if (justifyElement) {
                    let selectedOption = justifyElement.querySelector('option:checked');
                    justify = selectedOption && selectedOption.value ? selectedOption.textContent.trim() : '';
                }
                datas.push({
                    data: dataFalt,
                    just: justify || "Sem justificativa"
                });
            }
        });         
        return datas;
    },

    adjustToFirstPage: function(url) {
        const urlObj = new URL(url);    
        if (urlObj.searchParams.has('F')) {
            urlObj.searchParams.set('F', '1');
        } else {
            urlObj.searchParams.append('F', '1');
        }
        return urlObj.href;
    },  

    verifyAll: async function() {        
        RelatorioFaltas.modifyOption('relatorio', 1);        
        const firstPage = RelatorioFaltas.adjustToFirstPage(window.location.href);
        let currentDoc = await preparePage(firstPage);    
        let datas = RelatorioFaltas.getDatas(currentDoc);     
        RelatorioFaltas.allData.push(...datas);         
        let nextPageLink = [...currentDoc.querySelectorAll('a.NativeNavigatorLink[href*="F"]')]
            .find(link => /Pr[ó?]xima/i.test(link.textContent));
        while(nextPageLink) {        
            currentDoc = await preparePage(nextPageLink.href);
            datas = RelatorioFaltas.getDatas(currentDoc);
            RelatorioFaltas.allData.push(...datas);
            nextPageLink = [...currentDoc.querySelectorAll('a.NativeNavigatorLink[href*="F"]')]
            .find(link => /Pr[ó?]xima/i.test(link.textContent));
        }        
        let quantidade = RelatorioFaltas.allData.length;
        let finaliza = {data: 'Total de faltas:', just: quantidade};
        RelatorioFaltas.allData.push(finaliza);
        RelatorioFaltas.fillPdf(currentDoc);
    },

    fillPdf: async function(doc) {
        const urlPdf = chrome.runtime.getURL('pdf/formRelatorioFaltas.pdf');
        const pdfBytes = await fetch(urlPdf).then(res => res.arrayBuffer());
        const pages = RelatorioFaltas.selectPages(RelatorioFaltas.allData.length);
        let pdfDocList = await RelatorioFaltas.createNewPdf(pages, pdfBytes);
        const studentInfo = RelatorioFaltas.getStudentInfo(doc);      
        let y = 585;
        const lineHeight = 16;

        for (let i=0; i<pdfDocList.length; i++) {
            const pageDoc = await PDFLib.PDFDocument.load(pdfDocList[i]);
            let currentY = y;
            
            if (i==0) {
                this.drawElement(pageDoc, null, 710, 14, true, null,
                    studentInfo.school,
                );             
                this.drawElement(pageDoc, 55, 660, 12, false, null,
                    `Nome do(a) estudante: ${studentInfo.name}\nCódigo: ${studentInfo.code}`,
                );
                this.drawElement(pageDoc, 55, 610, 12, false, null,
                    'Faltas registradas para o(a) estudante:',
                );        
            }
            
            const index = i * 30;
            const endex = Math.min(index + 30, RelatorioFaltas.allData.length);
            if (i > 0) {
                currentY = 660;
            } else {
                currentY = 585;
            }        
            for (let j=index; j<endex; j++) {
                const item = RelatorioFaltas.allData[j];            
                this.drawElement(pageDoc, 55, currentY, 11, false, null,
                    `${item.data} (${item.just})`
                );
                currentY -= lineHeight;                       
            }

            if (i < pdfDocList.length - 1) {
                this.drawElement(pageDoc, 400, 80, 12, false, null,
                    'Continua na próxima página',
                );
            } else {           
                this.drawElement(pageDoc, null, 110, 12, true, null,
                    '________________________________\nSecretaria',
                );
                this.drawElement(pageDoc, null, 60, 12, true, null,
                    RelatorioFaltas.preencheData()
                );
            }

            const newPdfBytes = await pageDoc.save();
            pdfDocList[i] = newPdfBytes;        
        }

        let mergedPdf = await mergePdfPages(pdfDocList);
        RelatorioFaltas.modifyOption('relatorio', 0);             
        allData = [];    
        await openPdf(mergedPdf);
    },

    preencheData: function() {
        const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
        const date = new Date();
        
        return `Belo Horizonte, ${date.getDate()} de ${meses[date.getMonth()]} de ${date.getFullYear()}`;
    },

    selectPages: function(faltas) {
        const max = 30;
        const pages = Math.ceil(faltas / max);

        return pages;     
    },

    createNewPdf: async function(numPages, pdfBytes) {    
        const pdfDoc = await PDFLib.PDFDocument.load(pdfBytes);    
        const [templatePage] = await pdfDoc.copyPages(pdfDoc, [0]);     
        const pdfList = []; 

        for (let i=0; i<numPages; i++) {
            const newPdf = await PDFLib.PDFDocument.create();    
            const [newPage] = await newPdf.copyPages(pdfDoc, [0]);   
            newPdf.addPage(newPage);
            pdfList.push(await newPdf.save());
        }

        return pdfList;
    },

    drawElement:  async function(pdfDoc, x, y, fontSize, center, space, text) {
        if (!text || typeof text !== 'string') {
            throw new Error("Invalid text: must be a non-empty string");
        }

        const page = pdfDoc.getPages()[0];
        const { width } = page.getSize();
       
        const font = await pdfDoc.embedFont(PDFLib.StandardFonts.Helvetica);
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
}

const RegistroChamada = {
    tCodes: [],
    
    verifyPage: async function() { 
        const currentUrl = window.location.href;
        const pattern = /^https:\/\/page\.php/; // shadowed
        const pattern_a = /^https:\/\/page\.php/; // shadowed
        const pattern_b = /^https:\/\/page\.php/; // shadowed
        const pattern2 = /^https:\/\/page\.php/; // shadowed

        if (pattern.test(currentUrl) || pattern_a.test(currentUrl) || pattern_b.test(currentUrl)) {            
            addTabIcon(document);

            let tipo;         
            if (pattern.test(currentUrl)) {
                tipo = 'diario';
            }
            if (pattern_a.test(currentUrl)) {
                tipo = 'modulo';
            }
            if (pattern_b.test(currentUrl)) {
                tipo = 'periodo';                
            }

            let turmaAtual;
            addEventListener("load", function() {            
                turmaAtual = document.getElementsByName('COD')[0].value;              
            });
            
            await RegistroChamada.injectStyles(tipo);

            let target = Array.from(document.getElementsByName('COD'))[0];
            let targetParent = target.parentNode;            

            let newSelect = document.createElement('select');
            newSelect.id = 'inTurm';
            newSelect.name = 'turm';
            newSelect.className = 'NativeSelect inTurm';
            newSelect.addEventListener('change', function(){
                target.value = this.value;
                let optionId = parseInt(this.options[this.selectedIndex].id);                
                if (optionId === 0) {
                    tipo = 'diario';                    
                } if (optionId === 1) {
                    tipo = 'modulo';                    
                } if (optionId === 2) {
                    tipo = 'periodo';                    
                }                
                RegistroChamada.nextPage(this.value, null, tipo);
            });                  
                   
            await chrome.storage.local.get('turmaCodes', function(result) {
                if (result.turmaCodes) {                                    
                   
                    tCodes = result.turmaCodes;                                    
                    targetParent.childNodes.forEach(node => {
                        if (node.nodeType == Node.TEXT_NODE) {
                            targetParent.removeChild(node);
                        }
                    });
                    targetParent.appendChild(newSelect);

                    Array.from(tCodes).forEach(cod => {                        
                        var opt = document.createElement('option');                        
                        opt.value = cod.code;
                        opt.innerHTML = cod.name;
                        opt.id = cod.type;                                                               

                        document.getElementById('inTurm').appendChild(opt);                        
                        if (cod.code === target.value) {
                            opt.selected = true;
                        }
                    });

                    const tableRow = document.createElement('tr');
                    tableRow.innerHTML =  `<td class="NativeFieldCaptionTD">Navegação</td>
                                           <td class="NativeDataTD">                                           
                                                <a class="NativeDataLink" id="anterTurma" href="#" hidden style="padding: 10px"><<< Turma Anterior</a>
                                                <span>-</span>
                                                <a class="NativeDataLink" id="proxTurma" href="#" hidden style="padding: 10px">Próxima Turma >>> </a> 
                                            </td>
                                            `;                      
                    const firstTable = document.querySelectorAll('tbody')[1];            
                    var newTarget = firstTable.rows[firstTable.rows.length-2];    
                    newTarget.after(tableRow);  

                    let turmaCode = tCodes.findIndex(turma => turma.code === turmaAtual);
             
                    if (turmaCode+1 < tCodes.length) {                                                                                            
                        document.getElementById('proxTurma').addEventListener('click', function () {                            
                            var option = tCodes[turmaCode+1].type;
                            if (option === 0) {
                                    tipo = 'diario';                    
                            } if (option === 1) {
                                tipo = 'modulo';                    
                            } if (option === 2) {
                                tipo = 'periodo';                    
                            }                                                           
                            RegistroChamada.nextPage(tCodes[turmaCode].code, 1, tipo);
                        });
                        document.getElementById('proxTurma').hidden = false;
                    }
                    if (turmaCode > 0) {                                                
                        document.getElementById('anterTurma').addEventListener('click', function () {                        
                            var option = tCodes[turmaCode-1].type;
                            if (option === 0) {
                                    tipo = 'diario';                    
                            } if (option === 1) {
                                tipo = 'modulo';                    
                            } if (option === 2) {
                                tipo = 'periodo';                    
                            }    
                            RegistroChamada.nextPage(tCodes[turmaCode].code, -1, tipo)
                        });           
                        document.getElementById('anterTurma').hidden = false;
                    }                                       
                }
            });                   
        }  

        if (pattern2.test(currentUrl)) {  
            const aviso = document.createElement('div');
            aviso.innerHTML = `<label style="color: #FD001D;" colspan="2">Carregando dados...</label>`;
            aviso.id = 'avisoEs';
            document.getElementsByClassName('NativeHeaderFont')[1].appendChild(aviso);                        
            let tempDoc = await preparePage(currentUrl);            
            let linkF = await prepareLinkByDoc(tempDoc, "https://page.php?ANO=&s=&COD=&COD=&COD=&COD=");            
            getSetCodes(linkF);
            document.getElementById('avisoEs').remove();      
        }       
    },

    nextPage: function(codigo, passo, tipo) {            
        let index = tCodes.findIndex(turma => turma.code === codigo);        
        let dia = document.getElementsByName('DIA')[0].value;
        let turma;
        if (passo > 0) {
            turma = tCodes[index+1].code;
        } else if (passo < 0) {
            turma = tCodes[index-1].code;
        } else {
            turma = codigo
        }
        let link = 'https://page/f_'+tipo+'.php?COD='+turma+'&D='+dia;    
        if (RegistroChamada.verificaAlteracao()) {
            window.location.href = link;
        }    
    },

    verificaAlteracao: function() {
        result = true;
        if (document.getElementsByName('Status')[0].value == "X") {
            result = confirm("Deseja proseguir sem salvar as alterações?");
        }
        return result;
    },

    injectStyles:  async function(pageTipo) {
        let elements = document.getElementsByClassName('NativeInput');         
        const style = document.createElement('style');
        style.innerHTML = `
            .NativeInput:disabled {
                opacity: 0.6 !important;
            }
            table.NativeFormTABLE.IntercalarCor tr:hover {
                background-color:rgb(156, 173, 156);
            } 
            table.NativeFormTABLE tr:hover {
                background-color:rgb(156, 173, 156);
            }        
        `;        
        
        for (let i = 0; i < elements.length; i++) {
            
            if (elements[i].value == 'F') {               
                elements[i].style.backgroundColor = "rgb(255,180,180)";                  
            } else {
                elements[i].style.backgroundColor = "";
            }          
            if (elements[i].value == 'X') {
                elements[i].style. opacity = "0.2";  
            }            
            if (elements[i].disabled) {                
                elements[i].style.backgroundColor = "rgb(180,180,180)";
            }
            
            (function(element) {                
                element.addEventListener('click', function() { 
                    if (pageTipo == 'diario') {          
                        RegistroChamada.changeColor(element);
                    }
                    if (pageTipo == 'modulo') {                      
                        RegistroChamada.changeColorAll(element.name, 0);                    
                    }
                    if (pageTipo == 'periodo') {                      
                        RegistroChamada.changeColorAll(element.name, 1);                        
                    }
                });
            })
            (elements[i]);

        }
        
        elements = document.querySelectorAll('tr');
        document.head.appendChild(style);

    },

    changeColor: function(element) {    
        if (element.value == "F") {
            element.style.backgroundColor = "rgb(255,180,180)";
        } else {
            element.style.backgroundColor = "";
        }
    },   

    changeColorAll: function(valor, tipo) {           
        var complemento = "";	
        var quantidade = document.forms["F"].QTModulo?.value ?? 2;
        const tipos = ['I', 'IN'];            
        if(valor.substr((valor.length - 2),1) == "_"){
            complemento = valor.substr((valor.length - 1),1);
        }else{
            complemento = valor.substr((valor.length - 2),2);
        } 
        for(var x = 1; x <= quantidade; x++){            
            var nome = `${tipos[tipo]}${x}_${complemento}`;            
            if(document.forms.FREQUENCIA[nome].value != 'X'){
                if(document.forms.FREQUENCIA[nome].value == 'F'){                    
                    document.forms.FREQUENCIA[nome].style.backgroundColor = "rgb(255,180,180)";  
                } else {
                    document.forms.FREQUENCIA[nome].style.backgroundColor = "";
                }
            }
        }                      
    }
}

const FichasAvalicao = {

    executando: false,
    schoolData: {},              
    forms: ["pdf/formFichaAvaliacaoAnual.pdf", "pdf/formFichaAvaliacaoTrimestral.pdf"],

    addLink: async function() {   
        const currentUrl = window.location.href;
        const pattern = /https:\/\/page\.php/; // shadowed
     
        if (pattern.test(currentUrl)) {
            addTabIcon(document);
            const self = this;
            const container = document.getElementById('lista');
            console.log(container);

            const observer = new MutationObserver((mutationsList) => {
                for (const mutation of mutationsList) {
                    if (mutation.type === 'childList') {
                        const painel = document.querySelector('.pa');
                        if (painel && !painel.dataset.fichaInserida) {
                            self.setDataOptions(painel);
                            painel.dataset.fichaInserida = "true"; // evita repetição
                        }
                    }
                }
            });

            observer.observe(container, {
                childList: true,
                subtree: true
            });
    
            const painelInicial = document.querySelector('.pa');
            if (painelInicial && !painelInicial.dataset.fichaInserida) {
                self.setDataOptions(painelInicial);
                painelInicial.dataset.fichaInserida = "true";
            }       
        }
    },

    setDataOptions: async function(table) {                 
        try {                     
            let imageFicha = chrome.runtime.getURL('assets/ficha.png');
            let loadingImage = chrome.runtime.getURL('assets/loading.gif');
            const tableRows = table.querySelectorAll('tr');               
            const tH = document.createElement('th');
            tH.textContent = "OPÇÕES";                        
            tH.className = 'titPeriodo';                        
            tableRows[0].appendChild(tH);
            const linhas = Array.from(document.getElementsByClassName('linha'));
            
            linhas.forEach(item => {
                
                const tableCollumns = item.querySelectorAll('td');                
                
                if (tableCollumns) {
                    let numeroAluno = tableCollumns[0].textContent;
                    let codigoAluno = tableCollumns[1].textContent.split(' ');                    
                                        
                    if (codigoAluno != null) {                        
                       const navigationLink = document.createElement('a');                              
                       navigationLink.title = "Ficha de Avaliação";                       
                       navigationLink.target = "_blank";
                       navigationLink.className = "NativeDataLink";                 
                       navigationLink.style = `                        
                         display: inline-block;
                         z-index: 99;
                         width: 2em;
                         height: 2em;
                         background-image: url(${imageFicha});
                         background-size: contain;
                         background-repeat: no-repeat;
                         background-position: center;
                       `;   

                       navigationLink.addEventListener('click', async function(e) {     
                            e.stopPropagation();            
                            if (FichasAvalicao.executando) return;                                                                                
                            let botao = this;
                            FichasAvalicao.executando = true;
                            alteraBotao(botao, 'Carregando...', true, loadingImage);                            
                                           
                            FichasAvalicao.verifySchoolHeaders().then((isValid) => {
                                if (!isValid) {                    
                                    return;
                                }        
                            }); 
                            let status = verificaForms();
                            if (status) {                                
                                try { 
                                    let link = await FichasAvalicao.prepareLink(codigoAluno, numeroAluno);                                                                            
                                    let estudante = await FichasAvalicao.recolheDadosPdf(link);                            
                                    if (estudante) {
                                                                        
                                        let pdfDocBytes = await FichasAvalicao.preenchePdf(estudante[0], estudante[1], status.ensino);
                                        let mergedPdf = await mergePdfPages(pdfDocBytes); 
                                        await openPdf(mergedPdf);                                    
                                    } 
                                } catch (error) {
                                    console.log(error);
                                } finally {
                                    alteraBotao(botao, 'Ficha de Avaliação', false, imageFicha); 
                                    FichasAvalicao.executando = false;
                                }
                            }                            
                       });                     
                                                                                        
                       const tD = document.createElement('td');
                       tD.className = 'colPeriodo';
                       tD.style = `
                        z-index: 50;
                       `;
                       tD.appendChild(navigationLink);                   
                       item.appendChild(tD);                       
                    }                    
                }             
            }); 
        } catch (error) {            
        }      
    },

    verifySchoolHeaders: function() {
        return new Promise((resolve, reject) => {
            chrome.storage.local.get(['dadosEscola'], (result) => {
                const dadosEscola = result.dadosEscola || {};
                
                const camposObrigatorios = [
                    'escola', 'legal', 'endereco', 
                    'numero', 'complemento', 'bairro', 
                    'municipio', 'uf', 'cep', 
                    'telefone', 'email'
                ];
                
                const dadosCompletos = camposObrigatorios.every(campo => dadosEscola[campo]);
                
                if (!dadosEscola || !dadosCompletos) {
                    alert('Informações do cabeçalho não foram encontradas. Será aberta uma nova aba para o registro dos dados necessários');                    
                    chrome.runtime.sendMessage({ action: "openCadastro" });                    
                    resolve(false);                    
                } else {                                      
                    this.schoolData = dadosEscola;                                          
                    resolve(true);
                }
            });
        });
    },  

    recolheDadosPdf: async function(link) {                 
             
        pdfjsLib.GlobalWorkerOptions.workerSrc = chrome.runtime.getURL('pdf.worker.min.js');
        function desagruparAVs(array) {
                const resultado = [];
                array.forEach(str => {
                    const partes = str.trim().split(/\s+/);
                    if (partes.length > 1 && partes.every(p => p === 'AV')) {
                        // Se for um agrupamento de AVs, separa todos
                        partes.forEach(p => resultado.push(p));
                    } else {
                        resultado.push(str);
                    }
                });
                return resultado;
            }

        try {
            const pdf = await pdfjsLib.getDocument(link).promise;                      
            const pagina = await pdf.getPage(1);
            let textContent = await pagina.getTextContent();
            let textFinal = textContent.items.filter(item => item.str.trim() !== '').map(item => item.str.trim());
            textFinal = desagruparAVs(textFinal);          
        
            let disciplinas = {
                "ARTE": undefined, 
                "CIÊNCIAS": undefined,
                "EDUCAÇÃO FÍSICA": undefined,
                "GEOGRAFIA": undefined,
                "HISTÓRIA": undefined,
                "LÍNGUA PORTUGUESA": undefined,
                "MATEMÁTICA": undefined
            }
            Object.keys(disciplinas).forEach(disciplina => {
                disciplinas[disciplina] = textFinal.findIndex(disc => disc == disciplina);
            });

            let diversificadas = {}
            
            let finalDisIndex = disciplinas["MATEMÁTICA"]+9;
            let diverIndex = 0;

            while(finalDisIndex < textFinal.length-1) {                                      
                diverIndex++;                               
                diversificadas[textFinal[finalDisIndex]] = finalDisIndex;
                finalDisIndex+=9;  
            }                     

            function totalAntesOer(n1, n1r, n2, n2r, n3, n3r) {     
                const notas = [
                    Math.max(parseInt(n1) || 0, parseInt(n1r) || 0),
                    Math.max(parseInt(n2) || 0, parseInt(n2r) || 0),
                    Math.max(parseInt(n3) || 0, parseInt(n3r) || 0)
                ];
                const total = notas.reduce((acc, nota) => acc + nota, 0);
                return total;
            }           
           
            //dados básicos
            let estudante = {
                ano: textFinal[112], 
                escola: textFinal[113],                                               
                cod: textFinal[116],
                nome: textFinal[114],                
                nascimento: textFinal[115],
                turma: textFinal[118],                
            };       

            // atitudes e valores
            let atIndex = 120;
            for (let i=1; i<=9; i++) {                
                estudante[`av${i}_1`] = textFinal[atIndex++];                
                estudante[`av${i}_2`] = textFinal[atIndex++];                
                estudante[`av${i}_3`] = textFinal[atIndex++];                                                
            };

            //notas disciplinas comuns
            Object.entries(disciplinas).forEach(([nome, indice]) => {
                const p = nome[0].toLowerCase();
                for (let i=1; i<4; i++) {
                    estudante[`${p}${i}`] = textFinal[indice+i];
                }
                for (let i=6; i<9; i++) {
                    estudante[`${p}${i-5}r`] = textFinal[indice+i];
                }
                estudante[`${p}T`] = totalAntesOer(estudante[`${p}1`], estudante[`${p}1r`], estudante[`${p}2`], estudante[`${p}2r`], estudante[`${p}3`], estudante[`${p}3r`]);
                estudante[`${p}Tr`] = textFinal[indice+4];
                estudante[`${p}Tt`] = textFinal[indice+5];
            });
                      
            //notas disciplinas diversificadas            
            if (Object.entries(diversificadas).length > 0) {               
                Object.entries(diversificadas).forEach(([nome, indice], index) => {
                    const p = `d${index+1}_`;
                    for (let i=1; i<4; i++) {
                        estudante[`${p}${i}`] = textFinal[indice+i];
                    }
                    for (let i=6; i<9; i++) {
                        estudante[`${p}${i-5}r`] = textFinal[indice+i];
                    }
                    estudante[`diversificada${index+1}`] = nome;
                    estudante[`${p}T`] = totalAntesOer(estudante[`${p}1`], estudante[`${p}1r`], estudante[`${p}2`], estudante[`${p}2r`], estudante[`${p}3`], estudante[`${p}3r`]);
                    estudante[`${p}Tr`] = textFinal[indice+4];
                    estudante[`${p}Tt`] = textFinal[indice+5];
                });
            }

            //situacao final
            const textoIndex = textFinal[textFinal.length-1];            
            if (textoIndex.length > 2) {
                estudante["situacao"] = textoIndex;
            } else {
                estudante["situacao"] = "";
            }                     
                                  
            if (Object.keys(estudante).length > 6) {                
                if (estudante["situacao"].length > 2) {                    
                    return [estudante, 0];
                } else {                    
                    return [estudante, 1];
                }                
            } else {
                alert('Dados não foram obtidos de forma completa. Verifique o lançamento de notas, atitudes e valores');
            }
            
        } catch (error) {            
            alert('Dados incompletos. Verifique o lançamento de notas, atitudes e valores');             
            return;   
        }      
    },

    prepareLink: async function(codRme, numero) {
        let codAno = document.getElementById('ed').value;
        let codEscola = document.getElementById('ed').value;
        let codRegional = document.getElementById('ed').value;
        let codEtapa = document.getElementById('ed').value;
        let codEnsino = document.getElementById('ed').value;
        let codTurma = document.getElementById('ed').value;
        let codMatriculado = document.getElementById('ed').value;  

        if (codAno && codEscola && codRegional && codEtapa && codEnsino && codTurma && codMatriculado) {            
            let link = `https://page.php?c=I&a=get&ed=${numero}&ed=${codRme[0]}%20${codRme[1]}&ed=&ed=${codAno}&ed=${codRegional}&ed=${codEscola}&ed=${codEtapa}&ed=${codEnsino}&ed=${codTurma}&ed=${codMatriculado}`;
            return link;
        } else {
            return "";
        }      
    },
  
    preenchePdf: async function(estudante, formulario, ensino) {               
        const url = chrome.runtime.getURL(this.forms[formulario]);
        const pdfBytes = await fetch(url).then(res => res.arrayBuffer());    
        const pdfDoc = await PDFLib.PDFDocument.load(pdfBytes);
        const pdfDocList = [];
        const {PDFTextField} = PDFLib;
        let dia = (formataData(new Date()).toString());           
        let dataFinal = {...estudante, ...this.schoolData};
        const form = pdfDoc.getForm();        
        const fields = form.getFields().filter(field => field instanceof PDFTextField);
                        
        fields.forEach(field => {
            const name = field.getName();                
            field.setText((dataFinal[name] ?? "").toString());     
        });        
        if (formulario == 0) {
            if (ensino == 1) {
                form.getCheckBox('fundamental').check();          
            } else {    
                form.getCheckBox('eja').check();
            }
        }                
        if (fields.find(field => field.getName() === 'legal1')) {
            if (this.schoolData.legal.length > 97) {
                let legal1 = this.schoolData.legal.slice(0, 97);
                let legal2 = this.schoolData.legal.slice(97);   
                form.getTextField('legal1').setText(legal1);
                form.getTextField('legal2').setText(legal2);           
            } else {
                form.getTextField('legal1').setText(this.schoolData.legal);
            }  
        }
        form.getTextField('data').setText(dia);      
               
        const newPdfBytes = await pdfDoc.save();
        pdfDocList.push(newPdfBytes); 
        await resetForm(form);                                        
        return pdfDocList;
    }   
}

const PesquisaResponsavel = {

    addLink: async function() {    
        const currentUrl = window.location.href;    
        const pattern = /https:\/\/page\.php/; // shadowed
        const pattern2 = /^https:\/\/page\.php/; // shadowed
        
        if (pattern.test(currentUrl)) {      

            let profileName = document.getElementById('t').childNodes[4].textContent.trim();                        
            var profiles = ["MA", "SE", "DI", "CO PE"]; // shadowed            
            
            if (profiles.includes(profileName)) {
                addTabIcon(document);       
                const option = document.createElement('p');   
                option.innerHTML =`
                    <a class="NativeDataLink" id ="localizaRes" href="https://page.php?">ES - Localizar por Responsável</a>
                `;
                const targetCollumn = document.getElementById('quadro2');
                targetCollumn.appendChild(option);
            }                         
        }

        if (pattern2.test(currentUrl)) {
            let url = new URL(window.location.href);
            if (!url.searchParams.get('Pessoa')) {
                this.restoreOption('NativeFormTABLE');                 
                for (const a of document.querySelectorAll('a')) {                   
                    if (a.textContent.includes('Fechar')) {                        
                        a.href = "https://page.php";
                        a.textContent = "Voltar para a página anterior";
                    }
                }                
            }   

            const elementos = document.querySelectorAll('[id^="ar"]');
            elementos.forEach((elemento) => {
                const observer = new MutationObserver((mutationsList) => {
                    for (const mutation of mutationsList) {
                        for (const node of mutation.addedNodes) {
                            if (node.nodeType === 1 && node.tagName === 'TABLE') {                                
                                const linhas = node.querySelectorAll('td');
                                linhas.forEach(linha => {
                                    const texto = linha.innerText.trim();
                                    const caractere = texto.charAt(0);
                                    if (!isNaN(caractere)) {
                                        this.addNewMenu(linha);                                        
                                    }                                    
                                });
                            }
                        }                       
                    }
                });
                observer.observe(elemento, {
                    childList: true, 
                    subtree: false 
                });
            });                                                       
        }
    },

    addNewMenu: function(element) {
        let codAluno = element.textContent.split(" ");                        
        const linkNavegacao = document.createElement('a');
        linkNavegacao.innerHTML = element.textContent;        
        linkNavegacao.href = "https://page.php?r="+codAluno[0]+"&r="+codAluno[1]; 
        linkNavegacao.className = "NativeDataLink";
        linkNavegacao.title = "Ir para Movimentação";  
        element.innerText = "";
        element.appendChild(linkNavegacao);
    },
    
    restoreOption: function(name) {        
        const destino = document.getElementsByClassName(name)[0];
        const tbody = destino.querySelector('tbody') || destino; 

        const linha1 = document.createElement('tr');
        linha1.innerHTML = `                    
            <td class="NativeFieldCaptionTD">Nome da Pessoa&nbsp;</td> 
            <td class="NativeDataTD"><input id="s_NOM_PESS" class="NativeInput" value="" maxlength="100" size="50" name="s_NOM_PESS">&nbsp;</td>            
        `;
        const linha2 = document.createElement('tr');
        linha2.innerHTML = `                        
            <td class="NativeFieldCaptionTD">Identidade</td> 
            <td class="NativeDataTD"><input id="s_NUM_DOCTO_PESS" class="NativeInput" value="" name="s_NUM_DOCTO_PESS"></td>       
        `;

        const primeiraLinha = tbody.querySelector('tr');
        if (primeiraLinha) {
            tbody.insertBefore(linha2, primeiraLinha);
            tbody.insertBefore(linha1, linha2);
        } else {
            tbody.appendChild(linha1);
            tbody.appendChild(linha2);
        }        
    }   
}

const NavegacaoParaGestao = {

    addLink: async function() {    
        const currentUrl = window.location.href;
        const pattern = /https:\/\/page\.php\?rm=\d+&rme=\d+/; // shadowed               
        
        if (pattern.test(currentUrl)) {    
            addTabIcon(document);                     
            this.changeNavigation();               
        }
    },

    changeNavigation: function() {
        const tableName = document.getElementsByClassName('tab');        
        if (tableName) {
            const itens = document.getElementsByTagName('td');
            let codAluno = itens[0].textContent.split(" ");            
            let ano = itens[6].textContent;                        
            let nomAluno = itens[1].textContent;
            const navigationLink = document.createElement('a');
            navigationLink.textContent = nomAluno;
            nomAluno = nomAluno.trim().replace(/\s+/g,'+');                                   
            navigationLink.href = "https://page.php?a="+ano+"&r="+codAluno[0]+"&r="+codAluno[1];            
            navigationLink.className = "NativeDataLink";
            navigationLink.title = "Ir para Gestão de Alunos";
            itens[1].textContent = "";
            itens[1].appendChild(navigationLink);
        }
    }  
}

const GestaoAlunosOpcoes = {

   addLink: async function() {    
        const currentUrl = window.location.href;    
        const pattern = /https:\/\/page\.php/; // shadowed                

        if (pattern.test(currentUrl)) { 
            addTabIcon(document);
            const tableName = document.getElementsByClassName('tab');
            if (tableName) {                
                this.getDataOptions(tableName);               
            }                       
        }
   }, 

    getDataOptions: async function(tableName) {           
        try {         
            const tableRows = document.getElementsByTagName('tr');          
            const tH = document.createElement('th');
            const a = document.createElement('a');
            a.textContent = "Opções";            
            a.style = "color: #344662; font-weight: bold; font-size: small; text-decoration: underline;"
            tH.appendChild(a);
            tableRows[0].appendChild(tH);
            const itens = document.getElementsByClassName('NativeDataLink');
            let i = 1;
            Array.from(itens).forEach(item => {
                let itemUrl = item.href;                
                if (itemUrl) {
                    const url = new URL(itemUrl);
                    let codRme = url.searchParams.get('COD');
                    let anoRme = url.searchParams.get('COD'); 
                    let codEsc = url.searchParams.get('COD');
                    let ano = url.searchParams.get('A');
                    if (anoRme != null && codRme != null && codEsc != null) {                        
                       const navigationLink1 = document.createElement('a');                       
                       navigationLink1.title = "Justificativa de Faltas";
                       navigationLink1.href = "https://page.php?A="+ano+"&COD="+codEsc+"&COD="+anoRme+"&COD="+codRme;
                       navigationLink1.className = "NativeDataLink";                 
                       navigationLink1.style = `
                        display: inline-block;
                        width: 2em;
                        height: 2em;
                        background-image: url(${chrome.runtime.getURL("assets/justificativa.png")});
                        background-size: contain;
                        background-repeat: no-repeat;
                        background-position: center;
                        `;   
                       const navigationLink2 = document.createElement('a');                       
                       navigationLink2.title = "Formulários";
                       navigationLink2.href = "https://page.php?COD="+anoRme+"&COD="+codRme+"&A="+ano+"&COD="+codEsc;                       
                       navigationLink2.className = "NativeDataLink";                 
                       navigationLink2.style = `
                        display: inline-block;
                        width: 2em;
                        height: 2em;
                        background-image: url(${chrome.runtime.getURL("assets/relatorio.png")});
                        background-size: contain;
                        background-repeat: no-repeat;
                        background-position: center;
                        `;                                               

                       const tD = document.createElement('td');
                       tD.style.cssText = `                                                
                        justify-content: center;                        
                        display: table-cell;                        
                        align-items: center;
                        padding: 1px 5px 1px 5px;                       
	                    border-bottom: 1px solid #ccc;	
                        vertical-align: inherit;
                        unicode-bidi: isolate;                    
                        `;
                       tD.appendChild(navigationLink1);                    
                       tD.appendChild(navigationLink2);
                       tableRows[i].appendChild(tD);
                       i++;
                    }                    
                }             
            }); 
        } catch (error) {            
        }      
    }    
}

const NavegacaoTempoAmpliado = {

    addLink: async function() {         
        const currentUrl = window.location.href;    
        const pattern = /https:\/\/page\.php/; // shadowed        

        if (pattern.test(currentUrl)) { 
            addTabIcon(document);
            const table = document.querySelector('.tab.dados');
            if (table) {                       
                this.setDataOptions(table);                             
            }                       
        }
    },

    setDataOptions: async function(table) {                     
        const linhas = table.querySelectorAll('tr');

        linhas.forEach((linha, index) => {
            if (index == 0) {return};
            const colunas = linha.querySelectorAll('td');
            const codAluno = colunas[0].textContent.split("-");            
            const codEscola = document.getElementById('F').value;
            const anoProjeto = colunas[5].textContent;
            const cargHoraria = colunas[6];                     
             
            const navigationLink = document.createElement('a');
            navigationLink.style.fontSize = 4;
            navigationLink.textContent = cargHoraria.textContent;                                  
            navigationLink.href = `https://page.php?COD=${codAluno[0]}&COD=${codAluno[1]}&A=${anoProjeto}&COD=${codEscola}`;            
            navigationLink.className = "NativeDataLink";
            navigationLink.title = "Ir para tempo ampliado";
            cargHoraria.textContent = "";
            cargHoraria.appendChild(navigationLink);
        });
    }       
}    

const ManualExt = {

    addLink: async function() {         
        const currentUrl = window.location.href;    
        const pattern = /https:\/\/page\.php/; // shadowed    
      
        if (pattern.test(currentUrl)) {   
            addTabIcon(document);       
            const option = document.createElement('p');  
            const manualExtUrl = chrome.runtime.getURL("/pdf/Leia-me.pdf"); 
            option.innerHTML =`
                <li>
                <a class="NativeDataLink" id="manualExt" href=${manualExtUrl}>ES - Extensão SGE</a>
                </li>
            `;
            const targetElement = document.querySelector('ol');
            targetElement.appendChild(option);            
        }                    
    }
}

const Novidades = {

    addLink: async function() {         
        const currentUrl = window.location.href;    
        const pattern = /^https:\/\/page\.br\/?$/; // shadowed
        const pattern_a = /^https:\/\/page\.br\/index\.php$/; // shadowed               
      
        if (pattern.test(currentUrl) || pattern_a.test(currentUrl)) {   
            addTabIcon(document);       

            const option = document.createElement('p');  
            const novidadesPdf = chrome.runtime.getURL("/pdf/novidades.pdf");

            option.innerHTML =`
                <a id="opcaoNovidades" href="" style="align-items: center; justify-content: center; display: flex">
                    <img src=${chrome.runtime.getURL("assets/icon.png")} style="width: 2vw; margin-right: 5px">           
                    <span class="NativeHeaderFont">Extensão SGE - Nova Versão - ###</span>
                </a>                
            `;
            option.addEventListener('click', () => {
                window.open(novidadesPdf, '_blank');
            });
            const targetElement = document.getElementsByClassName('NativeFormTABLE')[0];
            targetElement.after(option);            
        }                    
    }
}

const RelatoriosPorTurma = {
    
    addLink: async function(locationHref) {
        const pattern = /https:\/\/page\.php/; // shadowed
     
        if (pattern.test(locationHref)) {
            addTabIcon(document); 
            const option1 = document.createElement('p');
            option1.innerHTML = `
                <a class="NativeDataLink" id="listaAssinatura" href="#">Lista com Assinatura</a>
            `;
            const option2 = document.createElement('p');
            option2.innerHTML = `
                <a class="NativeDataLink" id="listaTabelaSimples" href="#">Tabela de Controle Simples</a>
            `;
            const targetElement = document.querySelector('a[target="_blank"]');
            targetElement.after(option1, option2);            
            let codTurma = new URLSearchParams(window.location.search).get("COD");            
            let nomTurma = new URLSearchParams(window.location.search).get("COD");                  
            if(codTurma) {
                option1.addEventListener('click', async () => {    
                    let dados = await getDataNomes(codTurma, nomTurma);  
                    if (dados) {              
                        this.relatorioAssinatura(dados);
                    }
                });
                option2.addEventListener('click', async () => {    
                    let dados = await getDataNomes(codTurma, nomTurma);  
                    if (dados) {              
                        this.relatorioTabelaSimples(dados);
                    }
                });                   
            }
        }
    },
   
    relatorioAssinatura: async function (dados) {     
        const url = chrome.runtime.getURL('pdf/formFichaAssinatura.pdf');
        const pdfBytes = await fetch(url).then(res => res.arrayBuffer());    
        const pdfDoc = await PDFLib.PDFDocument.load(pdfBytes);

        let nomeEscola = document.getElementsByClassName("NativeDataTD")[0].innerText;        
        let dataAtual = (formataData(new Date()).toString());
        
        const form = pdfDoc.getForm();
        let formData = form.getTextField("data");
        formData.setText(dataAtual);
             
        drawTextElement(pdfDoc, 141.6, 775.5, 9.8, false, false, nomeEscola);
        drawTextElement(pdfDoc, 68, 747.5, 9, false, false, dados[0].class);  

        let x = 38;
        let y = 680;

        dados.forEach(idx => {            
            drawTextElement(pdfDoc, x, y, 9, false, false, idx.number, 44);
            x+=19;
            drawTextElement(pdfDoc, x, y, 9, false, false, idx.name, 44);
            y-=19.6;
            x-=19;
        });

        const newPdfBytes = await pdfDoc.save();
        openPdf(newPdfBytes);        
    },

    relatorioTabelaSimples: async function (dados) {     
        const url = chrome.runtime.getURL('pdf/formFichaTabelaSimples.pdf');
        const pdfBytes = await fetch(url).then(res => res.arrayBuffer());    
        const pdfDoc = await PDFLib.PDFDocument.load(pdfBytes);

        let nomeEscola = document.getElementsByClassName("NativeDataTD")[0].innerText;        
        let dataAtual = (formataData(new Date()).toString());
        
        const form = pdfDoc.getForm();
        let formData = form.getTextField("data");
        formData.setText(dataAtual);
             
        drawTextElement(pdfDoc, 141.6, 543, 9.8, false, false, nomeEscola);
        drawTextElement(pdfDoc, 68, 516.7, 9, false, false, dados[0].class);  

        let x = 38;
        let y = 459.5;          

        dados.forEach(idx => {            
            drawTextElement(pdfDoc, x, y, 8, false, false, idx.number, 40);
            x+=17;
            drawTextElement(pdfDoc, x, y, 8, false, false, idx.name, 40);
            y-=12.45;
            x-=17;
        });

        const newPdfBytes = await pdfDoc.save();
        openPdf(newPdfBytes);        
    }
}

const VerificaTempoAmpliado = {

    addLink: async function() {
        const currentUrl = new URL(window.location.href);
        const pattern = /https:\/\/page\.php/; // shadowed        
     
        if (pattern.test(currentUrl)) {       
            addTabIcon(document); 
            let codEsc = currentUrl.searchParams.get('COD');
            let codRmeAno = currentUrl.searchParams.get('COD');
            let codRmeSequ = currentUrl.searchParams.get('COD');
            let codAno = currentUrl.searchParams.get('A');

            let link = `https://page.php?COD=${codRmeAno}&COD=${codRmeSequ}&A=${codAno}&CODL=${codEsc}`;
            let status = await this.verifyStudent(link);            
            
            if (status == true) {
                this.setMessage();
            }             
        }
    },

    verifyStudent: async function(link) {
        
        let page = await preparePage(link);        
        let elements = page.getElementsByClassName('NativeDataTD');                
        let texts = [];        
        Array.from(elements).forEach(item => {
            texts.push(item.innerText);
        });        
        
        if (texts.some(f => f.includes("FEIRA")) || texts.includes('SÁBADO') || texts.includes('DOMINGO') ) {
            return true;
        } else {
            return false;
        }
        
    },

    setMessage: function() {
        let elementTarget = document.getElementsByClassName('corfundo')[1].parentElement;
        const aviso = document.createElement('tr');
        aviso.innerHTML = `<td style="color: #FD001D;" colspan="2">ATENÇÃO: O(a) estudante possui tempo ampliado cadastrado. Verifique o módulo de atividade complementar.</td>`;
        elementTarget.before(aviso);
    }
}

const ConsolidadoMensal = {

    addLink: async function() {
        const currentUrl = new URL(window.location.href);        
        const pattern = /https:\/\/page\.php\?c=cons&a=ed/; // shadowed
     
        if (pattern.test(currentUrl)) {
            addTabIcon(document);                        
            await this.setChanges(currentUrl);              
        }
    },

    setChanges: async function(url) {
        const aviso = document.createElement('div');
        aviso.innerHTML = `<label style="color: #FD001D;" colspan="2">Carregando dados...</label>`;
        aviso.id = 'avisoEs';
        document.getElementById('editar').appendChild(aviso);
        let students = await this.getDataStatus(url);        
        await this.formatElements(students);
        document.getElementById('avisoEs').remove();
    },

    getDataStatus: async function(url) {              
        const classCode = url.searchParams.get('cod');
        let studentStatus = [];            
        const docHtml = await preparePage(`https://page.php?COD=${classCode}`);
        const elementTd = Array.from(docHtml.getElementsByTagName('td'));
        const mapStatus = {
            'A1': 'Afastado por transferência',
            'A2': 'Afastado por abandono',
            'A3': 'Transferido após conclusão',
            'A4': 'Remanejado para outra turma',
            'A5': 'Remanejado de outra turma'
        }           
        elementTd.forEach((element, idx) => {                   
            if(element.innerText.trim() == "A1" || element.innerText.trim() == "A2" || element.innerText.trim() == "A3" || element.innerText.trim() === "A4" || element.innerText.trim() === "A5") { 
                let ind = element.innerText.trim() === "A4" || element.innerText.trim() === "A5" ? idx-3 : idx-4;
                let stats = element.innerText.trim() == "A5" ? true : false;
                let student = {                    
                    number: elementTd[ind].innerText,
                    status: mapStatus[element.innerText.trim()] || '',
                    statusSpecific: stats
                };               
                studentStatus.push(student);          
            }
        });               
        return studentStatus;      
    },

    formatElements: async function(students) {
        const cssAdd = document.createElement('style');
        cssAdd.innerHTML = `
            tr.destaque td {
                color: #919191;
                text-decoration: line-through;
            }
            tr.destaqueRed td {
                color: #2e2e2eff;
                font-weight: bold;
            }            
        `;
        document.head.append(cssAdd); 
        let pageElements_a = Array.from(document.getElementsByClassName('col'));
        pageElements_a.forEach(ind => {    
            if (Number(ind.innerText) >= 50) {
                ind.style = 'color: #ff0000';
                ind.nextElementSibling.style = 'color: #ff0000';
            }
        });       
        let pageElements = Array.from(document.getElementsByClassName('col'));                      
        pageElements.forEach(ind => {    
            const studentF = students.find(student => Number(student.number) === Number(ind.innerText));
            if (studentF) {                
                if (studentF.statusSpecific == true) {                    
                    ind.parentElement.className = 'destaqueRed';
                } else {                    
                    ind.parentElement.className = 'destaque';
                }                
                ind.parentElement.title = studentF.status;
            }        
        });        
    }
}

const RegistroManualPresenca = {

    pdfBytesSave: [],

    addLink: async function() {
        const currentUrl = new URL(window.location.href);        
        const pattern = /https:\/\/page\.br\/p\/?\?func=r/; // shadowed
        
        if (pattern.test(currentUrl)) {
            addTabIcon(document);
            const self = this;
            const container = document.querySelector('[name="fo"]');

            const observer = new MutationObserver((mutationsList) => {
                for (const mutation of mutationsList) {
                    if (mutation.type === 'childList') {
                        const tabelaBm = document.querySelector('[class="pad"]');
                        if (tabelaBm && !tabelaBm.dataset.exibido) {                            
                            tabelaBm.dataset.exibido = "true";
                            this.setDataOption('changeMesRefe');                                
                        }
                    }
                }
            });
            try {
                observer.observe(container, {
                    childList: true,
                    subtree: true
                });
            } catch (error) {
                
            }
            // se já tiver exibido
            const tabelaInicial = document.querySelector('[class="pad"]');
            if (tabelaInicial && !tabelaInicial.dataset.exibido) {
                dadosBm = this.recolheBm('chs[]');
                tabelaInicial.dataset.exibido = "true";
                await this.setDataOption('cha');                
            } 
        }        
    },

    addNewMenu: function(data) {        
        const container = document.createElement('div');
        container.innerHTML =`
            <table id="novaTabela">
                <tr id="containerN" style="vertical-align: top">                    
                    <td id="conteudo1" class="NativeFormTABLE">
                    </td>
                    <td id="conteudo2" class="NativeFormTABLE">                        
                        <div style="display: flex; flex-direction: column; align-items: center; background-color: #dddddd; padding: 5px; border: 1px solid rgb(136, 136, 136)">  
                            <span style="font: 700 15px/22px Arial; height: 22.0028px; padding: 5px 0; text-align: center; text-indent: 0; self-align: center">FORMATAÇÃO DA LISTA</span>
                            <button id="formatarPdfFinal" name="formatarPdf" class="pad formatarPdf" style="display: none; margin-top: 10px">IMPRIMIR RMP FORMATADO</button>                           
                            <div style="padding: 5px">          
                                <table style="padding: 10px; outline: #000000 solid 1px; text-align: center; background-color: #ffffff; margin-top: 5px;  font-size: small;">
                                    <tbody id="formataLista">
                                        <tr> 
                                            <td colspan="2" style="text-align: center;"> 
                                                <div style="margin: 2px 2px 2px 2px;">
                                                    <a class="NativeFieldCaptionTD">RMP - REGISTRO MANUAL DE PRESENÇA - 
                                                        <span id="mesName"></span>                                                        
                                                    </a>
                                                    <hr style="height: 1px; background-color:#000000">                                                                                                 
                                                </div>
                                            </td>
                                        </tr>              
                                        <tr id="cabecalho" style="outline: solid 1px;">
                                            <td style="background-color: #dddddd; height: 20px; text-align: center;">Dia</td>
                                            <td style="background-color: #dddddd; height: 20px; text-align: center;">Ação</td>    
                                        </tr>                                   
                                    </tbody>                                           
                                </table>   
                            </div>    
                            <button id="formatarPdfFinal1" name="formatarPdf" class="pad formatarPdf" style="display: none; margin-top: 10px">IMPRIMIR RMP FORMATADO</button> 
                        </div>
                    </td>                
                </tr>
            </table>
        `;        

        let parentElement = document.querySelector('[name="form_imprime"]');
        const existingContainter = document.getElementById('formataLista');
        if (existingContainter) {            
            while(existingContainter.children.length > 2) {
                existingContainter.removeChild(existingContainter.children[2]);
            }
        } else {
            parentElement.parentNode.appendChild(container);
        }   
        if (data) {
            const textoMes = document.getElementById("txtMesRefe").innerText;
            document.getElementById("mesName").innerText = textoMes;
            document.getElementsByName('formatarPdf').forEach(el => {el.style.display = "block"});
            const tableBody = document.querySelector('[id="formataLista"]');            
            Array.from(data).forEach((date, i)=> {                                
                let newTr = document.createElement('tr');
                newTr.id = `acao${i}`
                newTr.style = "outline: #000000 solid 1px; text-align: center; background-color: #ffffff;";
                newTr.innerHTML = `
                    <td style="height: 20px; text-align: center;" id="diaNome${i}">${date.dia}</td>
                    <td style="height: 20px; text-align: center; align-items: center">
                        <input style="margin-right:2px;" type="checkbox" id="diaLista${i}" name="diaLista" value="${date.position}" title="Riscar dia">
                        <span>Riscar linha</span>
                    </td>                    
                `;
                tableBody.appendChild(newTr);
                if (date.dia.includes('Sab') || date.dia.includes('Dom')) {
                    document.getElementById(`diaLista${i}`).checked = true;
                    document.getElementById(`diaNome${i}`).style = "text-decoration: line-through; color: #929292ff";
                }
                document.getElementById(`diaLista${i}`).addEventListener('change', function(){
                    if (this.checked) {
                        document.getElementById(`diaNome${i}`).style = "text-decoration: line-through; color: #929292ff";
                    } else {
                        document.getElementById(`diaNome${i}`).style = "text-decoration: none; color: #000000ff";
                    }
                });
            });
        }        
        document.getElementById('conteudo1').appendChild(parentElement);

        document.querySelectorAll('[name="formatarPdf"]').forEach(el => {
            el.onclick = () => {                
                this.finalizaPdf(this.pdfBytesSave);
            };
        });
    },

    finalizaPdf: async function(pdfBytes) {        
        if (pdfBytes && pdfBytes.byteLength > 0) {
            const diasSelecionados = [...document.querySelectorAll('[name="diaLista"]:checked')].map(el => el.value);               
            const pdfDoc = await PDFLib.PDFDocument.load(pdfBytes);        
            await this.drawLines(pdfDoc, 73, 567.5, 1.2, '#000000', diasSelecionados);
            const newPdfBytes = await pdfDoc.save();
            await openPdf(newPdfBytes);
        }
    },

    recolheBm: function(idElemento){
        var bms = document.getElementsByName(idElemento);        
        var checkedBms = [];
        bms.forEach( bm => {
            if (bm.checked) {                
                checkedBms.push(bm.value);
            }
        });        
        return checkedBms;
    },
    //exclusiva de RegistroManualPresenca
    prepareLink: async function(bms) {
        var parameters = {
            _show_pdf: "",
            cod_escl: "",
            order: "",
            mesRefe: "",
            anoRefe: ""
        };

        Object.keys(parameters).forEach( key => {
            let element = document.querySelector(`[name="${key}"]`);
            if(element) {
                parameters[key] = element.value;
            }
        });
        let checkedBms = [];
        bms.forEach(bm => {
            checkedBms.push(`&check_servidores[]=${bm}`);
        });        
        let link = `https://page&pdf=${parameters.pdf}&cod=${parameters.cod}&o=${parameters.o}&m=${parameters.m}&a=${parameters.a}${checkedBms.join("")}`;
        return link;
    },

    carregaConteudo: async function(element) {
        travaDestrava(element, true);       
        const dadosBm = RegistroManualPresenca.recolheBm('check_servidores[]');
        if (dadosBm.length > 0) {            
            let link = await RegistroManualPresenca.prepareLink(dadosBm);
            const pdfBytes = await fetch(link).then(res => res.arrayBuffer());            
            const task = pdfjsLib.getDocument({data: pdfBytes});
            const pdfDoc = await task.promise;
            const page1 = await pdfDoc.getPage(1);
            const textContent = await page1.getTextContent();              
            const diasSemana = [];            
            const stringDias = ["Dom","Seg","Ter","Qua","Qui","Sex","Sab"];

            textContent.items.filter(item => item.str.trim() !== '').forEach((item, i) => {  
                const texto = item.str.trim();
                const transf = item.transform;
                if (stringDias.some(dia => texto.includes(dia))) {
                    diasSemana.push({
                        dia: texto,
                        position: transf[5]
                    });         
                }      
            });                
            RegistroManualPresenca.addNewMenu(diasSemana);
            this.pdfBytesSave = pdfBytes;            
        } else {
            alert("É necessário selecionar ao menos um servidor.");
        }
        travaDestrava(element, false, "FORMATAR PÁGINA");   
    },

    setDataOption: async function(element) {                 
        try {            
            let opcaoFormata = document.createElement('button');    
            opcaoFormata.innerText = "FORMATAR PÁGINA";
            opcaoFormata.type = 'button';
            opcaoFormata.className = 'pad';
            opcaoFormata.id = 'opcFormata';
            opcaoFormata.style = 'float: right; margin-left: 10px';
            document.getElementById(element).after(opcaoFormata);
            document.getElementById('opcFormata').addEventListener('click', async function() {
                RegistroManualPresenca.carregaConteudo('opcFormata');
            });
            document.getElementById("changeMesRefe").addEventListener('click', function(){                
                const existingContainter = document.getElementById('formataLista');
                if (existingContainter) {
                    document.getElementById('mesName').innerText = "";
                    document.getElementsByName('formatarPdf').forEach(el => {el.style.display = "none"});                    
                    while(existingContainter.children.length > 2) {
                        existingContainter.removeChild(existingContainter.children[2]);
                    }
                }
            });
        } catch (error) {            
        }      
    },
 
    //específico para RegistroManualPresenca
    drawLines: async function(pdfDoc, xS, xE, thi, colorV, data) {        
        const pages = pdfDoc.getPages();
        const colorF = hexToRgb(colorV);  
        
        pages.forEach(page => {
            data.forEach(diaY => {
                page.drawLine({
                    start: { x: xS, y: parseFloat(diaY)+2 },
                    end: { x: xE, y: parseFloat(diaY)+2 },
                    thickness: thi,
                    color: PDFLib.rgb(colorF.r/255, colorF.g/255, colorF.b/255),
                    opacity: 1,
                }); 
            });
        });
    },
}

FichasAvalicao. addLink();
RelatorioFaltas.addLink();
ListaChamada.addLink();
RegistroChamada. verifyPage();
PesquisaResponsavel.addLink();
NavegacaoParaGestao.addLink();
GestaoAlunosOpcoes.addLink();
NavegacaoTempoAmpliado.addLink();
RelatoriosPorTurma.addLink(window.location.href);
VerificaTempoAmpliado.addLink();
ManualExt.addLink();
Novidades.addLink();
ConsolidadoMensal.addLink();
RegistroManualPresenca.addLink();
/*Desenvolvido por Daniel Borges Gomes Pereira - 1126308*/