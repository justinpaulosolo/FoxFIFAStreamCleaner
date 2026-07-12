const toggle = document.getElementById("toggleSidebar");

// Load saved state when popup opens
chrome.storage.sync.get(["hideSidebar"], (result) => {
  toggle.checked = !!result.hideSidebar;
});

toggle.addEventListener("change", () => {
  const hideSidebar = toggle.checked;

  // Save preference so it persists across page reloads
  chrome.storage.sync.set({ hideSidebar });

  // Tell the content script on the active tab to apply it now
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]?.id) {
      chrome.tabs.sendMessage(tabs[0].id, {
        type: "TOGGLE_SIDEBAR",
        hideSidebar,
      });
    }
  });
});