function createCookie(name, value, days) {
  var expires = '';
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    expires = '; expires='+date.toGMTString();
  }
  document.cookie = name+'='+value+expires+'; path=/';
}

function readCookie(name) {
    var nameEQ = name + '=';
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
      if(ca[i].indexOf(nameEQ) > -1) {
        var cookieArray = ca[i].split('=');
        var cookieValue = cookieArray[1];
        return cookieValue;
      }
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name,'',-1);
}

function clearAllStyles() {
  document.querySelector('body').classList.remove('blueTh');
  document.querySelector('body').classList.remove('greenTh');
  document.querySelector('body').classList.remove('pinkTh');
  document.querySelector('body').classList.remove('hackerTh');
  document.querySelector('body').classList.remove('darkTh');
}

function applyStyle(style) {
     if(style === 'blueStyle') {
      clearAllStyles();
      document.querySelector('body').classList.add('blueTh');
      createCookie('themeSelector', 'blueStyle');
   }
   else if(style === 'darkStyle') {
      clearAllStyles();
      document.querySelector('body').classList.add('darkTh');
      createCookie('themeSelector', 'darkStyle');
   }
   else if(style === 'greenStyle') {
      clearAllStyles();
      document.querySelector('body').classList.add('greenTh');
      createCookie('themeSelector', 'greenStyle');
   }
    else if(style === 'pinkStyle') {
      clearAllStyles();
      document.querySelector('body').classList.add('pinkTh');
      createCookie('themeSelector', 'pinkStyle');
   }
    else if(style === 'hackerStyle') {
      clearAllStyles();
      document.querySelector('body').classList.add('hackerTh');
      createCookie('themeSelector', 'hackerStyle');
   }
   else if(style === 'resetStyle') {
      clearAllStyles();
      eraseCookie('themeSelector');
   }
}

// Load cookie and apply style:
chrome.runtime.sendMessage({}, function() {
  var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === 'complete') {
      clearInterval(readyStateCheckInterval);

      var defaultStyle = 'darkStyle';
      var style = readCookie('themeSelector');
      if (style !== null) {
        applyStyle(style);
      }
      else {
        applyStyle(defaultStyle);
      }
      
    }
  }, 10);
});

// Listen to messages from background script and apply style:
chrome.runtime.onMessage.addListener(function(request) {
  applyStyle(request);
});