const SIDEBAR_SELECTOR = '#WatchSidePanelContainer';

function applySidebarState(hideSidebar) {
  const sidebar = document.querySelector(SIDEBAR_SELECTOR);

  if (!sidebar) return;
  sidebar.style.display = hideSidebar ? "none" : "";
  
  const parent = sidebar.parentElement;
  if (parent) {
    parent.style.gridTemplateColumns = hideSidebar ? "1fr" : ""; 
  }
}

let currentHideSidebar = false;

chrome.storage.sync.get(["hideSidebar"], (result) => {
  currentHideSidebar = !!result.hideSidebar;
  applySidebarState(currentHideSidebar);
});

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "TOGGLE_SIDEBAR") {
    applySidebarState(message.hideSidebar);
    currentHideSidebar = message.hideSidebar;
  }
});

const observer = new MutationObserver(() => {
  applySidebarState(currentHideSidebar);
});
 
observer.observe(document.body, { childList: true, subtree: true });