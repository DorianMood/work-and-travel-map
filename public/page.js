chrome.tabs.create({ url: `${chrome.extension.getURL('index.html')}?${'region=Wisc Dells, WI&region=Saratoga, WY'}` })

chrome.runtime.sendMessage('hello');