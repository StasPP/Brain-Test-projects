// u = require('./global.js')
let btn = document.getElementById('btn')
let out = document.getElementById('label')
let table = document.getElementById('mytable')

let interval = 1000;

let urls = [];

function OutUrls() 
// for tests. Could be deleted in future
{
    out.innerText += '\ntest: '+localStorage.getItem('testVal')
    out.innerText += '\n!Urls TypeOf: '+typeof urls
    out.innerText += '\n!Urls: '+urls+'!';
    urls.forEach( (u, i)=> {out.innerText += '\n    '+ i +': ['+u[0]+']['+u[1]+']';})
}


function updateUrls() {
    // out.innerText = ''

    let url_list = localStorage.getItem('my_urls');
    let freq_list = localStorage.getItem('my_freq');
    // out.innerText += '\nmy_urls: '+url_list+'!';
    //out.innerText += '\nmy_freq: '+freq_list+'!';

    if (url_list != null && freq_list != null) {

        url_list = JSON.parse(url_list)
        freq_list = JSON.parse(freq_list)
    
        urls = []
        for (let i = 0; i < url_list.length; i++)
          if (i < freq_list.length) urls.push([url_list[i], freq_list[i]])
       
    }
    // out.innerText += '\n------INITIAL-----'
    // OutUrls()

    if (!urls || urls.length === 0) { 
        urls = [['URL','Time, sec']]
        // out.innerText += '\n------UPLOAD-----'
        UploadUrls()
        // OutUrls()
        // return 0
    }    

    // out.innerText += '\n------'
    // urls = JSON.parse(urls);
    // OutUrls() 
}

function UploadUrls() {
    let url_list = []
    let freq_list = []

    url_list = urls.map( (url) => url[0]) 
    freq_list = urls.map( (url) => url[1]) 
    // urls.forEach((u) => {url_list.push[u[0]]; url_list.push[u[1]]})
    // out.innerText += '\n!Urls: '+urls+'!';
    // out.innerText += '\nmy_urls: '+url_list+'!';
    // out.innerText += '\nmy_freq: '+freq_list+'!';    
    localStorage.setItem('my_urls', JSON.stringify(url_list));
    localStorage.setItem('my_freq', JSON.stringify(freq_list));
}


function OutTable(table, data) 
{
    //out.innerText = data
    // out.innerHtml = '<table>'
    out.innerText = ''
    // urls.forEach( (url, idx) => {
    //     if (idx === 0) out.innerHTML += '<thead>'
    //     let tag = idx === 0 ? 'th' : 'td'
    //     out.innerHtml += '<tr>'
    //     out.innerHtml += `<${tag}>` + url[0] + `</${tag}>`
    //     out.innerHtml += `<${tag}>` + url[1] + `</${tag}>`
    //     out.innerHtml += '</tr>'
    //     if (idx === 0) out.innerHTML += '</thead><tbody>'
    //     // out.innerText += url
    // } ) 

    // out.innerHtml += `</tbody></table>`

    while (table.childNodes.length) {
        table.removeChild(table.childNodes[0]);
    }

    // out.innerText = ''

    for (let element of data) {
        let row = table.insertRow();
        for (key in element) {
            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
            cell.appendChild(text);
        }
    }

}

function GetData() 
{    
    if (urls.length === 0) updateUrls();
    // updateUrls();
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
        if (!broken) { urls.push([url,0]); out.innerText += '\nAdded '+url}
    });

    OutTable(table, urls);
    // OutUrls()
    UploadUrls()
}

function GetTable()
{
   updateUrls();
   OutTable(table, urls); 
}

let tableProc = setInterval(  GetTable, interval);

btn.addEventListener('click', () => { localStorage.removeItem('my_urls');
                                    localStorage.removeItem('my_freq'); urls = [];
                                    localStorage.setItem('testVal','Hello World 5');})