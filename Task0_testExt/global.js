let interval = 1000;
let urls = [];

function updateUrls() /// function that updates the urls array using the Local Storage
{
    // Data stored in localSorage as two separate arrays
    let url_list = localStorage.getItem('my_urls');
    let freq_list = localStorage.getItem('my_freq');

    // If the arrays aren't empty or null, merge them into the one URL array
    if (url_list != null && freq_list != null) {
        url_list = JSON.parse(url_list)
        freq_list = JSON.parse(freq_list)
        urls = []
        for (let i = 0; i < url_list.length; i++)
          if (i < freq_list.length) urls.push([url_list[i], freq_list[i]])
    }

    // In case of failure, create a new array and put it into localStorage
    if (!urls || urls.length === 0) { 
        urls = [['URL','Time, sec']]
        UploadUrls()
    }    
}

function UploadUrls() // function that uploads the urls array into localStorage
{
    // separate urls array into two separate arrays
    url_list = urls.map( (url) => url[0]) 
    freq_list = urls.map( (url) => url[1]) 
    
    // save the arrays to localStorage
    localStorage.setItem('my_urls', JSON.stringify(url_list));
    localStorage.setItem('my_freq', JSON.stringify(freq_list));
}

function UpdateData()  // function that updates the time spent on each of the urls
{    
    if (urls.length === 0) updateUrls();

    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        let url = tabs[0].url;
        // use `url` here inside the callback because it's asynchronous!
        let broken = false
        for (let i = 0; i < urls.length; i++) { 
            if (url === urls[i][0])
            {
                urls[i][1] += interval / 1000
                broken = true
                break
            }   
        }
        if (!broken) urls.push([url,0])
    });

    UploadUrls()
}

// set the data being updated with the certain interval
let mainProc = setInterval( UpdateData, interval);