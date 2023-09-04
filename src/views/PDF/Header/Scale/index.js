/* 缩放pdf */
import { useContext, useEffect, useRef } from 'react'
import classes from './scale.module.scss'
import ScaleContext from '@/store/scale-context'

const Scale = () => {
  const { scale, setScaleWithCheck } = useContext(ScaleContext)

  const scaleRef = useRef()

  const setScale = (e) => {
    const value = Number(e.target.value)
    value !== NaN && setScaleWithCheck(value)
  }

  useEffect(() => {
    scaleRef.current.value = scale
  }, [scale])

  return (
    <div className={classes.scale}>
      <span className={classes['zoom-in']} onClick={() => setScaleWithCheck(scale + 10)}>+</span>
      <span className={classes['scale-input']}>
        <input className='input' ref={scaleRef} type="number" min="0" max="1000" onBlur={setScale} />%
      </span>
      <span className={classes['zoom-out']} onClick={() => setScaleWithCheck(scale - 10)}>-</span>
    </div>
  )
}

export default Scale