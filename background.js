chrome.commands.onCommand.addListener(function(command) {
  if (command === 'new-tab') {
    // First we need to focus the current window
    // otherwise the new tab won't have the cursor in the OmniBar
    chrome.windows.getCurrent({}, function(win){
      chrome.windows.update(win.id, {focused: true}, function() {
        chrome.tabs.create({});
      });
    });
  } else if (command === 'new-window') {
    // Simply passing focused doesn't seem to work so try harder
    chrome.windows.create({focused: true}, function(win){
      chrome.windows.update(win.id, {focused: true});
    });
  } else if (command === 'new-incognito-window') {
    // If you use this, you need to check "Allow in incognito" checkbox of the
    // extension
    chrome.windows.create({focused: true, incognito: true}, function(win){
      chrome.windows.update(win.id, {focused: true});
    });
  }
});
