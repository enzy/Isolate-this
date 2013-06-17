chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	// Move active tab to a new minimal window sized as requested
	chrome.windows.create({
		tabId: sender.tab.id,
		focused: true,
		type: "popup",
		width: request.width,
		height: request.height
	}, function(window) {
		sendResponse(window);
	});

	return true;
});

chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.executeScript(null, {file:"libs/jquery.min.js"}, function() {
		chrome.tabs.executeScript(null, {file:"src/inject/inject.js"});
	});
});