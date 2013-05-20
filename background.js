chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
alert("background side!");

    chrome.tabs.getSelected(null, function(tab) {
        chrome.tabs.sendMessage(tab.id, tab, function(response) {
            console.log(response);
        });

        chrome.tabs.sendMessage(1406, {myObj: "tset"}, function(response) {
            console.log({myObj: "tset"});
        });
    });
    console.log("background side!");
    //console.log(request);
    //console.log(sender);

    sendResponse(chrome.tabs);
});
