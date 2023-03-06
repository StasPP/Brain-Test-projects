/// Variables for the main loop

let interval = 1000;  // ToDo:  return back! 10000
let lastupdate = 0;
let currentUrl = '';
let urls = [];
let isUserActive = true;

// Proc variables
let mainProc = null;

//----------------------------------------------------------------

function uploadUrls() // function that uploads the urls array into localStorage
{
    // separate urls array into two separate arrays
    url_list = urls.map( (url) => url[0]) 
    freq_list = urls.map( (url) => url[1]) 
    
    // save the arrays to localStorage
    localStorage.setItem('heybrain_urls', JSON.stringify(url_list));
    localStorage.setItem('heybrain_freq', JSON.stringify(freq_list));

    // save current url and time of the update
    localStorage.setItem('heybrain_last_url', currentUrl);
    let date = new Date();
    localStorage.setItem('heybrain_last_update',  date);
}

function updateUrls() /// function that updates the urls array using the Local Storage
{
    // Data stored in localSorage as two separate arrays
    let url_list = localStorage.getItem('heybrain_urls');
    let freq_list = localStorage.getItem('heybrain_freq');
    let upd = localStorage.getItem('');

    // If the arrays aren't empty or null, merge them into the one URL array
    if (url_list != null && freq_list != null) {
        url_list = JSON.parse(url_list);
        freq_list = JSON.parse(freq_list);
        urls = [];
        for (let i = 0; i < url_list.length; i++)
          if (i < freq_list.length) urls.push([url_list[i], freq_list[i]]);
    }

    // In case of failure, create a new array and put it into localStorage
    if (!urls || urls.length === 0) { 
        urls = [['URL','Time, sec']];
        uploadUrls();
    }    
}

function updateData()  // function that updates the time spent on each of the urls
{    
    if (urls.length === 0) updateUrls();

    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => 
    {    

        // Function that updates the Urls array
        function checkUrl(url, time) 
        {
            // Check if the url is correct
            if (url === '' || url == undefined || url == null) return 0;

            // Look for the url in the array. Update it if it was found            
            let notFound = false;
            for (let i = 0; i < urls.length; i++) { 
                if (url === urls[i][0])
                {
                    urls[i][1] += time; 
                    notFound = true;
                    break;
                }   
            }

            // If URL is not found in the array, add it
            if (!notFound) urls.push([url, dT]);
        }

        // Function that gets the time between the last update and now
        let dTime = () => 
        {
            let updDate = window.localStorage.getItem('heybrain_last_update');
            updDate = new Date(updDate);
            let curDate = new Date();
            return Math.round( (curDate-updDate)/1000 );
        }

        // 1. Update the variables
        let dT = dTime();
        let newUrl = isUserActive? tabs[0].url : ':inactive:'; /// ToDo: make it '' if inactive!

        // 2. Exit if nothing has changed
        if (dT === 0 && currentUrl === newUrl) return 0;   /// ToDo: add inactive!

        // 3. Update the urls array: search the LAST OPENED URL in the array
        checkUrl(currentUrl, dT);
        
        // 4. If the URL has been changed, add a new one to the array
        if (currentUrl !== newUrl) 
        { 
            checkUrl(newUrl, 0); 
            currentUrl = newUrl; 
        }

        // 5. Update the storage
        uploadUrls();
        waitForUser();
    });

}

// ----------------------------------------------------------------

// Receive messages from user_activity module
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.from == "heybrain_user_activity") 
    {
        isUserActive = true;
        console.log("User activity detected");
    }
    console.log("User activity detected");
});

// Send a message to user_activity module, that means we're waiting for a messages
function waitForUser() 
{

    // ToDo: make it works!


    isUserActive = false; 

    // chrome.tabs.query({active: true}, function(tabs){
    //     chrome.tabs.sendMessage(chrome.tabs[0].id, "heybrain_waiting"); 
    // })

    // function doInCurrentTab(tabCallback) {
    //     chrome.tabs.query(
    //         { currentWindow: true, active: true },
    //         function (tabArray) { tabCallback(tabArray[0]); }
    //     );
    // }

    // let activeTabId;
    // doInCurrentTab( function(tab){ activeTabId = tab.id } );

    // console.log("Waiting for user "+activeTabId  )
}

// ----------------------------------------------------------------

function ClearData() // function that clears LocalStorage arrays
{
    localStorage.removeItem('heybrain_urls');
    localStorage.removeItem('heybrain_freq'); 
    localStorage.removeItem('heybrain_last_url'); 
    localStorage.removeItem('heybrain_last_update'); 
    urls = []
}

function initialize() // full initialization function
{
    console.log('Initializing...')

    // clear local storage and initialize the last update time
    ClearData();
    lastupdate = Date.now();

    // set the data being updated with the a certain interval
    mainProc = setInterval(updateData, interval);
    
    updateData(); // first start

    // Add events for the resfeshing
    chrome.tabs.onActivated.addListener( () => {isUserActive = true; updateData()} );
    chrome.tabs.onUpdated.addListener(   () => {isUserActive = true; updateData()} );
    
    waitForUser();

    console.log('Initializing is done.')
}

// ----------------------------------------------------------------

// Start the script
initialize();
