import { useRef, useState } from 'react'
import classes from './pdf-upload.module.scss'

function Upload(props) {
  const [input, setInput] = useState()
  const [fileName, setFileName] = useState('')

  const inputRef = useRef()

  const changeInput = () => {
    const file = inputRef.current.files[0]
    setFileName(file.name)

    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (res) => {
      setInput(res.target.result)
    }
  }

  const upload = () => {
    inputRef.current.click()
  }

  return (
    <>
      <div className={classes['upload']} onClick={upload}>
        <p className={classes[fileName ? '' : 'upload-info']}>
          {fileName || '.pdf'}
        </p>
        <input
          type="file"
          accept=".pdf"
          className={classes['upload-file']}
          ref={inputRef}
          onChange={changeInput}
        ></input>
      </div>
      <button
        className={`btn btn-blue ${classes['view-btn']}`}
        disabled={!input}
        onClick={() => props.openPDF(input)}
      >
        查 看
      </button>
    </>
  )
}

export default Upload
