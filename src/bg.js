
const _ARTHM_EXT = 19198;

let port = chrome.runtime.connectNative("com.newt.arthmext");
port.onMessage.addListener(o=> {
    console.log(o);
});
port.onDisconnect.addListener(function() {
    console.log("已断开");
})

chrome.commands.onCommand.addListener(cmd=> {
    console.log(port);
    let key;
    switch (cmd) {
        case "ctrlt": key = "t"; break;
        case "ctrlw": key = "w"; break;
        case "ctrln": key = "n"; break;
    }
    chrome.tabs.query({
        url: [
            "https://dev-arthm.subkey.top/*", 
            "http://localhost:3000/draw*"
        ], 
        active: true
    }).then(tabs=> {
        tabs[0] && chrome.tabs.sendMessage(tabs[0].id, { _ARTHM_EXT, ctrlkey: key });
    });
});