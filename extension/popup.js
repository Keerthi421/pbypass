const status = document.getElementById('status');

document.getElementById('demo').addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (!tab?.url?.startsWith('http://localhost:5173/')) {
    status.textContent = 'Open the local demo at http://localhost:5173 first.';
    return;
  }

  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => window.dispatchEvent(new CustomEvent('premiumgate-demo-enable')),
  });

  status.textContent = 'Local presentation-layer demo triggered.';
});
