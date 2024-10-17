chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'USER_PROFILE_DATA') {
        console.log('Received profile data in background:', message.data);
        // Here you can process the data or send it to the React app
        sendResponse({ status: 'success' });
    }
});
