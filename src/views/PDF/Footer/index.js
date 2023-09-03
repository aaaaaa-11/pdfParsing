import React, { useEffect, useState } from 'react';
import classes from './footer.module.scss'

const Footer = React.forwardRef(({ pages, changePageNum, setPageNum }, ref) =>{
  const { num, total } = pages

  return (
    <footer className={classes.footer}>
      <button className="btn btn-white" disabled={num < 2} onClick={() => changePageNum(num - 1)}>
        &lt; 上一页
      </button>
      <input className={`input ${classes['page-num']}`} ref={ref} type="number" max={total} onBlur={setPageNum} />
      <button className="btn btn-white" disabled={num >= total} onClick={() => changePageNum(num + 1)}>
        下一页 &gt;
      </button>
    </footer>
  );
})

export default Footer;
