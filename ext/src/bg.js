
function post_to_content(o) {
    chrome.tabs.query({
        url: [
            "https://devtex.subkey.top/*", 
            "https://arthm.top/*", 
            "http://localhost:3000/draw*"
        ], 
        active: true
    }).then(tabs=> {
        tabs[0] && chrome.tabs.sendMessage(tabs[0].id, o);
    });
}

function post_to_port(data) {
    try {
        port.postMessage(data);
    }catch {
        post_to_content({ type: "error", error: "插件本地程序断联, 请重启插件" });
    }
}

let port = chrome.runtime.connectNative("com.newt.arthmext");
port.onMessage.addListener(o=> {
    post_to_content(o);
});

chrome.runtime.onMessage.addListener(dat=> {
    switch (dat.type) {
        case "refer-open":
            post_to_port(["a"]);
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