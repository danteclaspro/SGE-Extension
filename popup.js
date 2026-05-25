try {
document.getElementById('update').addEventListener('click', function() {
    chrome.runtime.sendMessage({ action: "openCadastro" });
});
} catch (error) {    
}