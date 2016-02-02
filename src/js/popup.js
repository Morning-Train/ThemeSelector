// Send message to content script:
function sendMessageToContent(message) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, message);
  });
}

// Add click events to popup DOM elements:
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('darkStyle').addEventListener('click', function() {
      sendMessageToContent('darkStyle');
    });
  	document.getElementById('blueStyle').addEventListener('click', function() {
    	sendMessageToContent('blueStyle');
  	});
    document.getElementById('greenStyle').addEventListener('click', function() {
      sendMessageToContent('greenStyle');
    });
    document.getElementById('pinkStyle').addEventListener('click', function() {
      sendMessageToContent('pinkStyle');
    });
    document.getElementById('hackerStyle').addEventListener('click', function() {
      sendMessageToContent('hackerStyle');
    });
    document.getElementById('resetStyle').addEventListener('click', function() {
      sendMessageToContent('resetStyle');
    });
});