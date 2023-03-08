let waitForEvent = false;  

chrome.runtime.onMessage.addListener(function(message) {
    if (message.message == "heybrain_waiting") 
    {
        waitForEvent = true;
        //console.log("test message 0");
    }
});

document.onmousemove = () => 
{
    if (waitForEvent) 
    {
        chrome.runtime.sendMessage({from:"heybrain_user_activity", message:"mouse"});  
        //console.log("test message 1");
        waitForEvent = false;  
    }
}

document.onkeydown = () => 
{
    if (waitForEvent) 
    {
        chrome.runtime.sendMessage({from:"heybrain_user_activity", message:"keyboard"});  
        //console.log("test message 2");
        waitForEvent = false;  
    }
}

document.onwheel = () => 
{
    if (waitForEvent) 
    {
        chrome.runtime.sendMessage({from:"heybrain_user_activity", message:"wheel"});  
        //console.log("test message 3");
        waitForEvent = false;  
    }
}
