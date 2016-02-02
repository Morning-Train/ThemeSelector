// Listen to tabs, and do stuff if messenger.com is active:
chrome.tabs.onUpdated.addListener(function(tabId, info, tab) {
    var url = info.url || tab.url;
    if(url && url.indexOf('messenger.com') > -1) {
        chrome.pageAction.show(tabId);
    }
    else {
        chrome.pageAction.hide(tabId);
    }
});




/*var toggle = true;
chrome.pageAction.onClicked.addListener(function(tab){
	toggle = !toggle;
	if (toggle) {
		chrome.tabs.sendMessage(tab.id, 'enable');
	    chrome.pageAction.setIcon({path: 'icons/icon48.png', tabId:tab.id});
	    chrome.pageAction.setTitle({tabId: tab.id, title: 'Disable Messenger Theme - Blue'});
	}
	else {
		chrome.tabs.sendMessage(tab.id, 'disable');
		chrome.pageAction.setIcon({path: 'icons/icon48-off.png', tabId:tab.id});
		chrome.pageAction.setTitle({tabId: tab.id, title: 'Enable Messenger Theme - Blue'});
	}
});*/