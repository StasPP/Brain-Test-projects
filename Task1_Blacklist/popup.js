// popup objects
let btnEdit = document.getElementById('btnEdit');
let btnAdd = document.getElementById('btnAdd');
let btnRemove = document.getElementById('btnRemove');
let edit = document.getElementById('edit');
let conf = document.getElementById('confirm');
let out = document.getElementById('out');
let listbox = document.getElementById('list');
let addUrl = document.getElementById("add-url");

let btnUrl = document.getElementById('btnUrl');
let btnDom = document.getElementById('btnDom');
let btnCancel = document.getElementById('btnCancel');

let add_url ='';
let add_dom ='';

function getDomainPart(url)
{
    let crop = -1;
    if (url.length > 2)
    {
        for (let i = 1; i < url.length-1; i++)
            if (url[i] == '/' && url[i+1] !=='/' && url[i-1] !== '/')
            {
                crop = i;
                break;
            }    
        if (crop > 0) return url.slice(0, crop);
    }
    return url;
}

function ProceedAdding(url)
{
    let isOk = addPageToBlackList(url);
    if(isOk)
    {
        outputBlackList();
    
        for (let i = 0; i < listbox.options.length; i++)
            listbox.options[i].selected = i === listbox.options.length-1;
    }
    else alert('Error!\nPage has errornous url or it is (or its domain)\n has been already added to the blacklist.');

}

function addItemToBlackList()
{ 

    if (addUrl.value !== '' && addUrl.value !== undefined) 
    {
        let to_add = getDomainPart(addUrl.value);
        
        // const isAddDomain = () => {
        //     const response = confirm("Do you want to add all the domain:\n"+to_add);
            
        //     if (response == true) {
        //         ProceedAdding(to_add)
        //     } else {
        //         allert('cancel')
        //         ProceedAdding(addUrl.value)
        //     }
        // }

        function wrapWord(word)  /// add \n to the long strings each 100 symbols
        {
            //insert SubString into String by index
            let insertAtIndex = (str, substring, index) => str.slice(0, index) + substring + str.slice(index);
           
            const amt = 50;  // number of characters limit for each string
    
            let count = Math.floor(word.length / amt); // Amount of changes       
            if (count > 0)
                for (let i = count; i > 0; i--)
                    word = insertAtIndex(word, "\r\n", i*amt); // Add a newstring stop-letter
    
            return word;
        }

        if (to_add !== addUrl.value) 
            {
                add_dom = to_add;
                add_url = addUrl.value;
                out.innerText = 'URL: \n'+wrapWord(add_url) +'\n\nDomain: \n'+wrapWord(to_add)
                
                edit.className = 'hidden';
                btnEdit.className = 'hidden';
                conf.className = '';
            }
        else
            ProceedAdding(to_add);
    }
}

function deleteItemFromBlackList()
{
    let selected = [];

    for (let i = 0; i < listbox.options.length; i++) {
        selected[i] = listbox.options[i].selected;
    }

    // remove all selected option
    let index = listbox.options.length;
    while (index--) {
        if (selected[index]) {
        listbox.remove(index);
        black_list.splice(index, 1);
        }
    }

    saveBlackList();
}
    
function allowEdit()
{
    edit.className = '';
    btnEdit.className = 'hidden';
    conf.className = 'hidden';
    addUrl.value = localStorage.getItem('heybrain_current_url');
}

function notAllowEdit()
{
    edit.className = 'hidden';
    conf.className = 'hidden';
    btnEdit.className = '';
}

function outputBlackList() 
{
    getBlackList();
    
    for (let i= listbox.options.length - 1; i >= 0; i--)  listbox.remove(i);

    if (black_list) black_list.forEach( (page, idx) => {
        const option = new Option(page, idx);
        // add it to the list
        listbox.add(option, undefined);
    }); 
}

function addCurrentPageToBlackList()
{
    addPageToBlackList(localStorage.getItem('heybrain_current_url'));
    outputBlackList();
}

// Init Popup
outputBlackList() 

// Events for the buttons
 


btnEdit.onclick = (e) => {
    e.preventDefault();
    allowEdit();
}
btnCancel.onclick = (e) => {
    e.preventDefault();
    allowEdit();
}
btnAdd.onclick = (e) => {
    e.preventDefault();
    addItemToBlackList()
}
btnRemove.onclick = (e) => {
    e.preventDefault();
    deleteItemFromBlackList();
}
btnUrl.onclick = (e) => {
    e.preventDefault();
    ProceedAdding(add_url);
    allowEdit();
}
btnDom.onclick = (e) => {
    e.preventDefault();
    ProceedAdding(add_dom);
    allowEdit();
}

notAllowEdit();
