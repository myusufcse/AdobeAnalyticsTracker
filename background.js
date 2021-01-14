var debug = true;
var detailsData = null;

var ports = [];
chrome.runtime.onConnect.addListener(function(port) {
    if (port.name !== "devtools") return;
    ports.push(port);
    port.onDisconnect.addListener(function() {
        var i = ports.indexOf(port);
        if (i !== -1) ports.splice(i, 1);
    });
    port.onMessage.addListener(function(msg) {
        console.log('Received message from devtools page', msg);
    });
});

chrome.browserAction.onClicked.addListener(
    function(tab) {

        debug = !debug;

        chrome.browserAction.setTitle({
            title: debug ? 'Adobe Analytics Tracker is ON' : 'Adobe Analytics Tracker is OFF'
        });

        chrome.browserAction.setIcon({
            path: debug ? 'icon.png' : 'icon-off.png'
        });
    }
);


chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        if (debug) {
            chrome.tabs.query({active: true, currentWindow: true},function(tabs) {
                if(details.method == 'POST' && details.requestBody && details.requestBody.raw) {
                    details.post_query = '';
                    for(var i=0; i<details.requestBody.raw.length; i++){
                        details.post_query += String.fromCharCode.apply(null, new Uint8Array(details.requestBody.raw[i].bytes));
                    }
            	}
                chrome.tabs.sendMessage(details.tabId, details);
                detailsData = details;
                
                ports.forEach(function(port) {
                    port.postMessage(detailsData);
                    console.log(detailsData);
                });
                
            });
        }
    },
    { urls: ["*://*/b/ss/*"] }, ['requestBody']
);

// // Function to send a message to all devtools.html views:
// function notifyDevtools() {
//     ports.forEach(function(port) {
//         port.postMessage(detailsData);
//     });
// }
