let waitForEvent = true;  /// ToDo: correct back to false


chrome.runtime.onMessage.addListener(receiver);
function receiver(request, sender, sendResponse) {
console.log(request.message)
return true
}

chrome.runtime.onMessage.addListener(function(message) {
    if (message.message == "heybrain_waiting") 
    {
        waitForEvent = true;
        console.log("test message 0");
    }
});

document.onmousemove = () => 
{
    if (waitForEvent) 
    {
        chrome.runtime.sendMessage({from:"heybrain_user_activity", message:"mouse"});  
        console.log("test message 1")
        // waitForEvent = false;  /// ToDo: return it back!
    }
 
}

document.onkeydown = () => 
{
    if (waitForEvent) 
    {
        chrome.runtime.sendMessage({from:"heybrain_user_activity", message:"keyboard"});  
        console.log("test message 2")
        // waitForEvent = false;  /// ToDo: return it back!
    }
    console.log("test message 2")
}

document.onwheel = () => 
{
    if (waitForEvent) 
    {
        chrome.runtime.sendMessage({from:"heybrain_user_activity", message:"wheel"});  
        console.log("test message 3")
        // waitForEvent = false;  /// ToDo: return it back!
    }
    // console.log("test message 3")
}
