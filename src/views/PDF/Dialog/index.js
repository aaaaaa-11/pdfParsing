import { useEffect, useState } from 'react'
import classes from './dialog.module.scss'

const Dialog = () => {
  const [dots, setDots] = useState([])

  useEffect(() => {
    let timer = setInterval(() => {
      setDots((prevDots) =>
        prevDots.length >= 3 ? [0] : [...prevDots, prevDots.length]
      )
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <div className={classes.dialog}>
      <p className={classes.info}>
        正在拼命加载
        {dots.map((dot) => (
          <span key={dot}>.</span>
        ))}
      </p>
    </div>
  )
}

export default Dialog
