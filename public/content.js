$(document).ready(() => {
    const parseRegions = () => {
        let regions = $('.job-listings > div > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(5) > div:nth-child(1)').text().replaceAll('Location\n', '').replaceAll('  ', '').replaceAll(/\n\n(.)*/g, '').split('\n');
        return regions;
    }

    chrome.runtime.onMessage.addListener((message, sender, callback) => {
        if (message['type'] === 'WORK_AND_TRAVEL_PARSE') {
            setTimeout(() => {
                chrome.runtime.sendMessage({ type: 'WORK_AND_TRAVEL_PARSE_DONE', data: parseRegions() });
                console.log('sent')
            }, 2000);
        }
    })

});