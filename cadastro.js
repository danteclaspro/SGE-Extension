document.addEventListener("DOMContentLoaded", () => {
    let boots = document.createElement('link');
    boots.href = chrome.runtime.getURL('pdf/formFichaAssinatura.pdf');
    boots.rel = "stylesheet";
    document.head.appendChild(boots);
});

