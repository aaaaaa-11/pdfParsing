import { useState } from 'react';
import classes from './input.module.scss';

function Input(props) {
  const [input, setInput] = useState();

  const changeInput = (e) => {
    setInput(e.target.value);
  };

  return (
    <>
      <input placeholder="请输入PDF地址" type="text" className={classes['pdf-url']} onChange={changeInput}></input>
      <button className={`btn btn-blue ${classes['view-btn']}`} disabled={!input} onClick={() => props.openPDF(input)}>
        查 看
      </button>
    </>
  );
}

export default Input;
