
chrome.runtime.onMessage.addListener(o=> {
    window.postMessage(o);
});
