chrome.devtools.panels.create("Adobe Analytics Tracker",
    "icon-round.png",
    "../devtools-panel/devtools-content.html",
    function(extensionPanel) {
    var _window; 

    var data = [];
    var port = chrome.runtime.connect({name: 'devtools'});
    port.onMessage.addListener(function(msg) {
        // Write information to the panel, if exists.
        // If we don't have a panel reference (yet), queue the data.
        if (_window) {
            _window.do_something(msg);
        } else {
            data.push(msg);
        }
    });
    
    extensionPanel.onShown.addListener(function tmp(panelWindow) {
        extensionPanel.onShown.removeListener(tmp); // Run once only
        _window = panelWindow;

        // Release queued data
        var msg;
        while (msg = data.shift()) 
            _window.do_something(msg);
        // Just to show that it's easy to talk to pass a message back:
        _window.respond = function(msg) {
            port.postMessage(msg);
        };
    });
});
