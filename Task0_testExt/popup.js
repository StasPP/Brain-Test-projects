// popup objects
let btn = document.getElementById('btn')
let out = document.getElementById('label')
let table = document.getElementById('mytable')

// main variables
let interval = 1000;
let urls = [];

function updateUrls() // function that gets the data from the Local Storage
{
    // Data stored in localSorage as two separate arrays
    let url_list = localStorage.getItem('my_urls');
    let freq_list = localStorage.getItem('my_freq');
    
    // If the arrays aren't empty or null, merge them into the one URL array
    urls = [];
    if (url_list != null && freq_list != null) {
        url_list = JSON.parse(url_list)
        freq_list = JSON.parse(freq_list)
        urls = []
        for (let i = 0; i < url_list.length; i++)
        if (i < freq_list.length) urls.push([url_list[i], freq_list[i]])
    }
}

function OutTable(table, data) // Table output function
{
    out.innerText = ''

    // Clean the table up!
    while (table.childNodes.length) {
        table.removeChild(table.childNodes[0]);
    }

    function wrapWord(word)  /// add \n to the long strings each 100 symbols
    {
        // insert SubString into String by index
        let insertAtIndex = (str, substring, index) => str.slice(0, index) + substring + str.slice(index);
       
        const amt = 50  // number of characters limit for each string

        var count = Math.floor(word.length / amt)  // Amount of changes       
        if (count > 0)
            for (let i = count; i > 0; i--)
                word = insertAtIndex(word, "\r\n", i*amt) // Add a newstring stop-letter

        return word;
    }


    // Loop for the table elements
    for (let element of data) {
        let row = table.insertRow();
        for (key in element) {
            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
            text.nodeValue = wrapWord(text.nodeValue)
            cell.appendChild(text);
        }
    }
}

function GetTable()  // The main function
{
   // Get data from localStorage
   updateUrls();

   // If the data is ok, return it into the table
   if (urls.length > 1) 
        OutTable(table, urls); 
}

// Set the repeateble updating of the table
let tableProc = setInterval(GetTable, interval);

// Clear the storage
btn.addEventListener('click', () => { 
                                      localStorage.removeItem('my_urls');
                                      localStorage.removeItem('my_freq'); 
                                      urls = [];
                                      OutTable(table, urls); 
                                    //  GetTable();
                                    })