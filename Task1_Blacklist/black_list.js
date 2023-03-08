let black_list = [];

let isInBlacklist = (page) => 
{
    getBlackList()
    page = page[page.length-1] === '/' ? page : page + '/';
    let result = black_list.includes(page)  /// 1) strict coinsedence
    
    if (!result) 
    {
        // deep equality analysis (ToDo add more!!!)
        page = page.replace('http://', '').replace('https://', '');
        page = page.toLowerCase()
        for (let i = 0; i < black_list.length; i++) 
        { 
            black_page = black_list[i];

            /// deleting the unnecessary substings, making lower case
            black_page = black_page.replace('http://', '').replace('https://', '');
            black_page = black_page.toLowerCase();
            result = black_page === page;

            // if the domain is in BlackList (as a part of the URL string)
            if (!result && page.length > black_page.length) {
                result = black_page === page.slice(0, black_page.length)
            }

            // no need in searching anymore
            if (result) break;
        } 
    }

    return result
}

// Load from local storage. ToDo: Load from File, load from server
let getBlackList = () => 
{
    // Data stored in localSorage as JSON object
    black_list = localStorage.getItem('heybrain_black_list');
    if (black_list) black_list = JSON.parse(black_list)
    else black_list = [];
}

// Save to localStorage. ToDo: Save to File, Upload to server
let saveBlackList = () => 
{
    localStorage.setItem('heybrain_black_list', JSON.stringify(black_list));
}

function addPageToBlackList(page)
{
    if (page != null && page != '' && !isInBlacklist(page))
    {
        console.log(page);
        page = page[page.length-1] === '/' ? page : page + '/';
        console.log(page);
        if (!black_list.includes(page))
        {
            black_list.push(page);
            saveBlackList();
            return true;
        }
    }    
    return false;
}
