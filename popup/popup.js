document.addEventListener('DOMContentLoaded', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      const tab = tabs[0];
      const domain = new URL(tab.url).hostname;
      chrome.storage.sync.get([`darkMode_${domain}`], function(result) {
        const checkbox = document.getElementById('toggle');
        if (result[`darkMode_${domain}`] === 'enabled') {
          checkbox.checked = true;
        } else {
          checkbox.checked = false;
        }
      });
    });
  });
  
  function toggleDarkMode(state) {
    document.getElementById('loading').style.display = 'block';
    document.getElementById('confirmation').style.display = 'none';
    chrome.runtime.sendMessage({ action: 'toggleDarkMode', state: state }, function(response) {
      if (response && response.success) {
        document.getElementById('loading').style.display = 'none';
        if (response.state) {
          document.getElementById('confirmation').innerText = 'Dark mode enabled';
        } else {
          document.getElementById('confirmation').innerText = 'Dark mode disabled';
        }
        document.getElementById('confirmation').style.display = 'block';
        setTimeout(function() {
          document.getElementById('confirmation').style.display = 'none';
        }, 2000);
      } else {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('confirmation').innerText = 'Error toggling dark mode';
        document.getElementById('confirmation').style.display = 'block';
      }
    });
  }
  
  document.getElementById('toggle').addEventListener('change', function() {
    const checkbox = this;
    const state = checkbox.checked;
    toggleDarkMode(state);
  });