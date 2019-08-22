import React, {useState} from 'react';
import config from './config'

function App() {
  const [file, setFile] = useState(null)

  const handleImageSubmit = ev => {
    ev.preventDefault()
    
    //const { image } = ev.target
    console.log(file)

    const form = new FormData()
    form.append('image', file)

    fetch(`${config.API_ENDPOINT}/upload-image`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        // 'Content-Type': 'multipart/form-data'
      },
      body: form
    
    }).then(res => {
      console.log(res)
    })
  }

  const onChange = (ev) => {
    setFile(ev.target.files[0]) 
  }

  return (
    <div className="App">
      <form onSubmit={ev => handleImageSubmit(ev)} >
        <label for="image-upload"></label>
        <input onChange={onChange} id="image_upload" name="image" type="file" accept="image/x-jpg"></input>
        <button type="submit">submit</button>
      </form>
    </div>
  );
}

export default App;
