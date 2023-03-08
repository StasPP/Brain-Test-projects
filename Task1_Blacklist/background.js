
function updateCurrentUrl() {
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs =>   
    {
        let url = tabs[0].url
        // Check if the url is correct
        if (url != '' && url !== undefined && url !== null) 
            localStorage.setItem('heybrain_current_url', url);
    } );
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method == "getBlackList")
    {
        let resp_data = isInBlacklist( localStorage.getItem('heybrain_current_url'));
        sendResponse({data: [resp_data]});
    }
});

chrome.tabs.onActivated.addListener(updateCurrentUrl);
chrome.tabs.onUpdated.addListener(updateCurrentUrl);