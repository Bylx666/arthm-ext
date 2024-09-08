const _ARTHM_EXT = 19198;
chrome.commands.onCommand.addListener(cmd=> {
    let key;
    switch (cmd) {
        case "ctrlt": key = "t"; break;
        case "ctrlw": key = "w"; break;
        case "ctrln": key = "n"; break;
    }
    chrome.tabs.query({
        url: ["https://dev-arthm.subkey.top*", "http://localhost:3000/draw*"], 
        active: true
    }).then(tabs=> {
        tabs[0] && chrome.tabs.sendMessage(tabs[0].id, { _ARTHM_EXT, ctrlkey: key });
    });
});