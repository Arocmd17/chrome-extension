var contextMenuItem = {
    "id": "spendMoney",
    "title": "spendMoney",
    "contexts": ["selection"]
};
chrome.contextMenus.create(contextMenuItem)

chrome.contextMenus.onClicked.addListener(function(clickData){
    alert(`${clickData.menuItemId}  ${clickData.selectionText}` )
    if (clickData.menuItemId == "spendMoney" && clickData.selectionText){
        console.log(`${clickData.menuItemId}  ${clickData.selectionText}` )
        if(clickData.selectionText){
            console.log(`inside` )
            chrome.storage.sync.get(['total', 'limit'], function(budget){
                var newTotal = 0;
                if (budget.total){
                    newTotal += parseInt(budget.total);
                }
                newTotal += parseInt(clickData.selectionText);
                chrome.storage.sync.set({'total':newTotal}, function(){
                    alert('inside 2')
                    if (newTotal >= parseInt(budget.limit)){
                        var notifiOptions ={
                            type: 'basic',
                            iconUrl: 'images/icon48.png',
                            title: 'Limit reached!',
                            message: "Uh oh! Looks like you've reached your limit!"
                        };
                        chrome.notifications.create('limitNotif', notifiOptions)
                        console.log(newTotal)
                        console.log(budget)
                    }
                })
            })
        }
    }
})

chrome.storage.onChanged.addListener(function(changes, storageName){
   chrome.browserAction.setBadgeText({"text": changes.total.newValue.toString()}) 
})