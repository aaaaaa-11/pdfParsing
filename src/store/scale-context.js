/* PDF页面缩放context */
import React, { useState } from "react"

const MAXSCALE = 1000

const MINSCALE = 0

const ScaleContext = React.createContext({
  scale: 100,
  setScaleWithCheck: () => {},
  changeScale: () => {}
})

export const ScaleContextProvider = (props) => {
  const [scale, setScale] = useState(100)

  // 检查传入的scale合法性
  const isValidate = (s) => {
    return s >= MINSCALE && s <= MAXSCALE
  }

  // 如果newScale合法，则设置为scale值
  const setScaleWithCheck = (newScale) => {
    if (isValidate(newScale)) {
      setScale(newScale)
    }
  }

  // zoomIn和zoomOut
  const changeScale = (offset) => {
    const newScale = scale + offset
    setScaleWithCheck(newScale)
  }

  const contextValue = {
    scale,
    setScaleWithCheck,
    changeScale
  }

  return (
    <ScaleContext.Provider value={contextValue}>
      {props.children}
    </ScaleContext.Provider>
  )
}

export default ScaleContext