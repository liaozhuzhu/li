import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  
  const [data, setData] = useState<any>(null)
  const [inputData, setInputData] = useState<string>('')
  const [outputData, setOutputData] = useState<string>('')

  useEffect(() => {
    axios.get('http://127.0.0.1:8080/api/data')
      .then(res => {
        setData(res.data.message)
        // console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

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

  return (
    <div className="w-[150px] h-screen flex flex-col justify-center items-center">
      <h1>Flask + React</h1>
      <p>{data}</p>
      <form onSubmit={handleSubmit}>
          <input 
              type="text" 
              value={inputData} 
              onChange={(e) => setInputData(e.target.value)} 
              placeholder="Type something..." 
          />
          <button type="submit">Send to Flask</button>
      </form>

      <p>You said: {outputData}</p>
    </div>
  )
}

export default App
