chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'toggleDarkMode') {
      const domain = new URL(sender.tab.url).hostname;
      if (request.state) {
        chrome.storage.sync.set({ [`darkMode_${domain}`]: 'enabled' });
      } else {
        chrome.storage.sync.remove(`darkMode_${domain}`);
      }
      chrome.scripting.executeScript({
        target: { tabId: sender.tab.id },
        function: applyDarkMode
      });
      sendResponse({ success: true, state: request.state });
    }
  });
  
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: applyDarkMode
      });
    }
  });
  