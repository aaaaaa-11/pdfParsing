import { useEffect, useState } from 'react'
import classes from './speech.module.scss'

/* 语音状态说明：
  0: 未播放语音 || 取消播放,
  1: 语音播报,
  2: 暂停,
  3: 继续,
  4: 取消
*/

function Speech({ pdfText, pageNum }) {
  let speechInstance

  const [currentStatus, setCurrentStatus] = useState(0)

  useEffect(() => {
    return () => {
      cancel()
    }
  }, [])

  useEffect(() => {
    cancel()
  }, [pageNum])

  // 语音播报
  const speech = () => {
    if (!speechInstance) {
      speechInstance = new SpeechSynthesisUtterance()
      // 播报结束后，触发end事件，重设状态
      // 注意：暂停后一段时间，也会触发end事件（这里默认lang="zh-CN"）
      // const voice = ['en-US', 'en-GB', 'en', 'zh-CN', 'zh-HK', 'zh-TW'][0]
      // speechInstance.lang = voice; // 只有设置lang = 'en-US'，暂停后不会触发end事件
      speechInstance.onend = (event) => {
        cancel()
      }
    }
    speechInstance.text = pdfText
    speechSynthesis.speak(speechInstance)
    setCurrentStatus(1)
  }

  // 暂停
  function pause() {
    speechSynthesis.pause()
    setCurrentStatus(2)
  }
  // 继续播放
  function resume() {
    speechSynthesis.resume()
    setCurrentStatus(1)
  }

  // 取消播放
  function cancel() {
    speechSynthesis.cancel()
    setCurrentStatus(0)
  }

  // 播放、暂停、继续按钮显示逻辑：
  let speechBtn

  if (currentStatus === 0) {
    speechBtn = (
      <button className="btn btn-green" disabled={!pdfText} onClick={speech}>
        语音播报
      </button>
    )
  }

  if (currentStatus === 1) {
    speechBtn = (
      <button className="btn btn-red" onClick={pause}>
        暂停
      </button>
    )
  }
  if (currentStatus === 2) {
    speechBtn = (
      <button className="btn btn-yellow" onClick={resume}>
        继续
      </button>
    )
  }

  return (
    <div className={classes.speech}>
      {speechBtn}
      {[1, 2, 3].includes(currentStatus) ? (
        <button className={`btn btn-white ${classes.cancel}`} onClick={cancel}>
          取消
        </button>
      ) : null}
    </div>
  )
}

export default Speech
