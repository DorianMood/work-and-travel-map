$(document).ready(() => {
    let regions = $('.job-listings > div > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(5) > div:nth-child(1)').text().replaceAll('Location\n', '').replaceAll('  ', '').replaceAll(/\n\n(.)*/g, '').split('\n');

    console.log(regions.length);

    chrome.runtime.sendMessage({ type: 'WORK_AND_TRAVEL_REGIONS' })

    console.log(document.querySelectorAll('.job-listings > div > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(5) > div:nth-child(1)'));
});