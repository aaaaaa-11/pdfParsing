import { useState } from 'react'
import classes from './input.module.scss'

console.log(
  '%c生产环境输入的pdf地址要使用https格式，因为本人将生产环境部署在https网站，开发环境则不需要',
  'color: #ed2828b8;'
)

function Input(props) {
  const [input, setInput] = useState()

  const changeInput = (e) => {
    setInput(e.target.value)
  }

  return (
    <>
      <input
        placeholder="请输入https格式的PDF地址"
        type="text"
        className={classes['pdf-url']}
        onChange={changeInput}
      ></input>
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

export default Input
