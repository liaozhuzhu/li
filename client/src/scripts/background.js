chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'USER_PROFILE_DATA') {
        const data = {
            user_prompt: message.user_prompt, 
            system_prompt: message.system_prompt
        };

        fetch('http://127.0.0.1:8080/api/model', {
            method: 'POST',  
            headers: {
            'Content-Type': 'application/json',  
            },
            body: JSON.stringify(data),  
        })
        .then(response => response.json()) 
        .then(data => {
            let res = data.response; 
            sendResponse({ status: 'success', response: res });
        })
        .catch(error => {
            sendResponse({ status: 'error', response: error });
        });

        return true;
    }
});
