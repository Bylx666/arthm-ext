
chrome.runtime.onMessage.addListener(o=> {
    window.postMessage(Object.assign({ _ARTHM_EXT: 19198 }, o));
});

window.onmessage = ({ data })=> {
    if (data._ARTHM_TO_EXT === 19198) 
        chrome.runtime.sendMessage(data);
};

let note = document.createElement("div");
note.id = "arthm-extension-installed";
document.body.append(note);
