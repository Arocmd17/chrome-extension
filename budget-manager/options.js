$(function() {

    chrome.storage.sync.get('limit', function(budget){
        $('#limit').val(budget.limit);
    })
    $('#saveLimit').click(function(){
        var limit = $('#limit').val();
        if(limit){
            chrome.storage.sync.set({'limit':limit}, function(){
                close();
            })
        }
    })
    $('#resetTotal').click(function(){
        chrome.storage.sync.set({'total':0}, function(){
            var notifiOptions ={
                type: 'basic',
                iconUrl: 'images/icon48.png',
                title: 'Total reset!',
                message: "Total has been reset to 0!"
            };
            chrome.notifications.create('limitNotif', notifiOptions)
        });
    })
})