let black_list = [];

let isInBlacklist = (page) => 
{
    getBlackList()

    page = page[page.length-1] === '/' ? page : page + '/';

    let result = black_list.includes(page)  /// 1) strict coinsedence
    // if (!result) 
    // {
    //     // deep equality analysis (ToDo add more!!!)
    //     page = page.replace('http://', '').replace('https://', '');
    //     page = page.toLowerCase()
    //     for (let i = 0; i < black_list.length; i++) 
    //     { 
    //         black_page = black_list[i];
    //         black_page = black_page.replace('http://', '').replace('https://', '');
    //         black_page = black_page.toLowerCase();
    //         result = black_page === page;
    //         if (result) break;
    //     } 
    // }
    return result
}

let getBlackList = () => 
{
    // Data stored in localSorage as JSON object
    black_list = localStorage.getItem('heybrain_black_list');
    if (black_list) black_list = JSON.parse(black_list)
    else black_list = [];
}

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
