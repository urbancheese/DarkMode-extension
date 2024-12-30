function applyDarkMode() {
    const domain = document.location.hostname;
    chrome.storage.sync.get([`darkMode_${domain}`], (result) => {
      if (result[`darkMode_${domain}`] === 'enabled') {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = chrome.runtime.getURL('styles/darkMode.css');
        document.head.appendChild(link);
      } else {
        const links = document.head.querySelectorAll('link[rel="stylesheet"]');
        for (let i = 0; i < links.length; i++) {
          if (links[i].href === chrome.runtime.getURL('styles/darkMode.css')) {
            links[i].remove();
            break;
          }
        }
      }
    });
  }
  
  applyDarkMode();
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'applyDarkMode') {
      applyDarkMode();
    }
  });
  