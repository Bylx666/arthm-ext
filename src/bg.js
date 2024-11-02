
const _ARTHM_EXT = 19198;

function post_to_content(o) {
    chrome.tabs.query({
        url: [
            "https://devtex.subkey.top/*", 
            "https://arthm.top/*", 
            "http://localhost:3000/draw*"
        ], 
        active: true
    }).then(tabs=> {
        tabs[0] && chrome.tabs.sendMessage(tabs[0].id, Object.assign({ _ARTHM_EXT }, o));
    });
}

let port = chrome.runtime.connectNative("com.newt.arthmext");
port.onMessage.addListener(o=> {
    post_to_content(o);
});
port.onDisconnect.addListener(function() {
    console.log("已断开");
});

chrome.runtime.onMessage.addListener(dat=> {
    switch (dat.type) {
        case "refer-open":
            port.postMessage(['a']);
            break;
    }
});

chrome.commands.onCommand.addListener(cmd=> {
    let key;
    switch (cmd) {
        case "ctrlt":
            key = "t";
            break;
        case "ctrlw":
            key = "w";
            break;
        case "ctrln":
            key = "n";
            break;
    }
    post_to_content({ type: "ctrl", key });
});