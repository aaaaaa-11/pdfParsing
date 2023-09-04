import { useEffect, useState } from 'react';
import classes from './speech.module.scss'

/* 语音状态说明：
  0: 未播放语音 || 取消播放,
  1: 语音播报,
  2: 暂停,
  3: 继续,
  4: 取消
*/

function Speech({ pdfText, pageNum }) {
  let speechInstance;

  const [currentStatus, setCurrentStatus] = useState(0)

  useEffect(() => {
    return () => {
      speechInstance &&  speechInstance.removeEventListener('end', cancel)
      cancel()
    }
  }, [])

  useEffect(() => {
    cancel()
  }, [pageNum])

  // 语音播报
  const speech = () => {
    const speechInstance = new SpeechSynthesisUtterance()
    speechInstance.text = pdfText
    speechSynthesis.speak(speechInstance);
    speechInstance.addEventListener('end', cancel)
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

  let speechBtn

  if (currentStatus === 0) {
    speechBtn = <button className='btn btn-green' disabled={!pdfText} onClick={speech}>语音播报</button>
  }


  if (currentStatus === 1) {
    speechBtn = <button className='btn btn-red' onClick={pause}>暂停</button>
  }
  if (currentStatus === 2) {
    speechBtn = <button className='btn btn-yellow' onClick={resume}>继续</button>
  }
  // console.log(pdfText, currentStatus, speechBtn);

  return (
    <div className={classes.speech}>
      { speechBtn }
      { [1, 2, 3].includes(currentStatus) ? <button className={`btn btn-white ${classes.cancel}`} onClick={cancel}>取消</button> : null}
    </div>
  );
}

export default Speech;
