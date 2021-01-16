chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { type: 'WORK_AND_TRAVEL_PARSE' });
});

chrome.tabs.create({ url: `${chrome.extension.getURL('index.html')}?${'region=Wisc Dells, WI&region=Saratoga, WY'}` })
