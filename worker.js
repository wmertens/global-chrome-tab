chrome.commands.onCommand.addListener(async command => {
  if (command === "new-tab") {
    // First we need to focus the current window
    // otherwise the new tab won't have the cursor in the OmniBar
    const win = await chrome.windows.getCurrent();
    await chrome.windows.update(win.id, { focused: true });
    await chrome.tabs.create({});
  } else if (command === "new-window") {
    const win = await chrome.windows.create({
      focused: true,
      state: "maximized",
    });
    // Simply passing focused doesn't seem to work so try harder
    await chrome.windows.update(win.id, { focused: true });
  } else if (command === "new-incognito-window") {
    // If you use this, you need to check "Allow in incognito" checkbox of the
    // extension
    const win = chrome.windows.create({ focused: true, incognito: true });
    await chrome.windows.update(win.id, { focused: true });
  }
});
