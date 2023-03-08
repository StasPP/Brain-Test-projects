// popup objects
let btnEdit = document.getElementById('btnEdit');
let btnAdd = document.getElementById('btnAdd');
let btnRemove = document.getElementById('btnRemove');
let edit = document.getElementById('edit');
let listbox = document.getElementById('list');
let addUrl = document.getElementById("add-url");

function addItemToBlackList()
{ 
    if (addUrl.value !== '' && addUrl.value !== undefined) 
    {
        let isOk = addPageToBlackList(addUrl.value);
        if(isOk)
        {
            outputBlackList();
           
            for (let i = 0; i < listbox.options.length; i++)
                listbox.options[i].selected = i === listbox.options.length-1;


        }
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
    addUrl.value = localStorage.getItem('heybrain_current_url');
}

function notAllowEdit()
{
    edit.className = 'hidden';
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

btnAdd.onclick = (e) => {
    e.preventDefault();
    addItemToBlackList()
}
btnRemove.onclick = (e) => {
    e.preventDefault();
    deleteItemFromBlackList();
}

notAllowEdit();
