// Asynchronous function that waits for the respond message
let isInBlacklist =  new Promise((resolve)  => 
{
    chrome.runtime.sendMessage(
        {method: "getBlackList", key: "status"}, 
             (response) => resolve(response.data) );
})

// Call for the asynchronous function's result
isInBlacklist.then((data) => {
    data === true
        ? console.log('the page '+location+' is in the blacklist')
        : console.log('the page '+location+' is NOT in the blacklist')
});   
