
chrome.runtime.onMessage.addListener(o=> {
    window.postMessage(o);
});

window.onmessage = ({ data })=> {
    if (data._ARTHM_TO_EXT === 19198) 
        chrome.runtime.sendMessage(data);
};
