chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "startReport") {        
        chrome.scripting.executeScript({
            target: { tabId: sender.tab.id },
            files: ['content.js']
        });
    }
});

chrome.action.onClicked.addListener((tab) => {    
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content.js']
    });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "openCadastro") {
        chrome.tabs.create({ url: chrome.runtime.getURL('cadastro.html') });
    }
});