import { useState } from 'react'
import axios from 'axios'

declare const chrome: any;

function App() {
  const [inputData, setInputData] = useState<string>('')
  const [outputData, setOutputData] = useState<string>('')
  // const [userProfileData, setUserProfileData] = useState<any>("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:8080/api/model', { prompt: inputData })
        .then(response => {
            let res = response.data.response
            setOutputData(res);
            setInputData("");
        })
        .catch(error => {
            console.error("There was an error posting the data!", error);
        });
  };

  const test = async () => {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    const tab = tabs[0];

    if (tab) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
          console.log("Hello from the content script!");
        }
      }, (result: any) => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
        } else {
          console.log("Script executed successfully:", result);
        }
      });
    } else {
      console.error("No active tab found");
    }
  }

  return (
    <div className="w-[300px] h-screen flex flex-col justify-center items-center">
      <h1>Fliee</h1>
      <button onClick={test}>Test</button>
      <form onSubmit={handleSubmit}>
          <input 
              type="text" 
              value={inputData} 
              onChange={(e) => setInputData(e.target.value)} 
              placeholder="Type something..." 
          />
          <button type="submit">Send to Flask</button>
      </form>

      <p>{outputData}</p>
    </div>
  )
}

export default App
