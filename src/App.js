import React, {useState} from 'react';
import config from './config'

function App() {
  const [file, setFile] = useState(null)
  const [img, setImg] = useState(null)

  const handleImageSubmit = ev => {
    ev.preventDefault()

    const form = new FormData()
    form.append('image', file)

    fetch(`${config.API_ENDPOINT}/upload-image`, {
      method: 'POST',
      body: form
    })
    .then(res => {
      return !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    })
    .then(res => {
      setImg(res.imageUrl)
    })
    .catch(err => {
      console.log(err)
    })
  }

  const onChange = (ev) => {
    setFile(ev.target.files[0]) 
  }

  return (
    <div className="App">
      <form onSubmit={ev => handleImageSubmit(ev)} >
        <label htmlFor="image-upload"></label>
        <input onChange={onChange} id="image_upload" name="image" type="file"></input>
        <button type="submit">submit</button>
        {img ? <img src={img} alt='cloudinary'></img> : null}
      </form>
    </div>
  );
}

export default App;
