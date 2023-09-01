import { useEffect, useState } from 'react';
import './pdf.scss';

function PDF(props) {
  const [pdf, setPdf] = useState();
  const [pdfText, setPdfText] = useState();
  const [hasPDF, setHasPDF] = useState(false);
  const [pages, setPages] = useState({
    num: 1,
    total: 1,
  });

  useEffect(() => {
    // 根据父组件url获取pdf
    props.url && openPDF(props.url);

    return () => {
      // 清除canvas
      const canvas = document.getElementById('pdf-container');
      if (canvas) {
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        console.log('clear');
        cancel()
      }
    };
  }, []);

  useEffect(() => {
    console.log('pdf page change');
    // 切换页面 || 第一次进来，渲染pdf
    pdf && renderPage();
  }, [pages.num, hasPDF]);

  // 渲染pdf
  const renderPage = () => {
    console.log('renderPage');
    pdf.getPage(pages.num).then(function (page) {
      page.getTextContent().then((res) => {
        let str = ''
        res?.items.forEach((item) => {
          str += item.str
        })
        setPdfText(str)
      });
      const scale = 1;
      const viewport = page.getViewport({ scale: scale });
      // Support HiDPI-screens.
      const outputScale = window.devicePixelRatio || 1;
      const canvas = document.getElementById('pdf-container');
      const context = canvas.getContext('2d');
      canvas.width = Math.floor(viewport.width * outputScale);
      canvas.height = Math.floor(viewport.height * outputScale);
      canvas.style.width = Math.floor(viewport.width) + 'px';
      canvas.style.height = Math.floor(viewport.height) + 'px';
      const transform = outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : null;
      const renderContext = {
        canvasContext: context,
        transform: transform,
        viewport: viewport,
      };
      page.render(renderContext);
    });
  };

  // 加载pdf
  const openPDF = (url) => {
    console.log('openPDF');
    const loadingTask = pdfjsLib.getDocument(url);
    loadingTask.promise.then(function (pdf) {
      setPdf(pdf);
      setHasPDF(true);
      setPages({
        ...pages,
        total: pdf.numPages,
      });
    }).catch(e => {
      alert('加载pdf失败，确认后跳回首页')
      props.close()
    });
  };

  // 切页面
  const changePage = (num) => {
    console.log('changePage');
    setPages(() => ({
      ...pages,
      num
    }))
  }

  // 修改页码
  const changePageNum = (e) => {
    const num = +e.target.value
    if (num > pages.total) {
      console.log('The maximum page number is exceeded');
      e.target.value = pages.num
    } else {
      num && changePage(num)
    }
  }

  // 语音播报
  const speech = () => {
    if (pdfText) {
      const speech = new SpeechSynthesisUtterance()
      speech.text = pdfText
      speechSynthesis.speak(speech);
    } else {
      console.log('未识别到文字');
    }
  }

  // 暂停
  function pause() {
    speechSynthesis.pause()
  }
  // 继续播放
  function resume() {
    speechSynthesis.resume()
  }

  // 取消播放
  function cancel() {
    speechSynthesis.cancel()
  }

  return (
    <div className="pdf-page">
      <header className="header">
        <span className='go-back' onClick={props.close}>&lt;</span>
        <div className="speech-tools">
          <button onClick={speech}>语音播报</button>
          <button onClick={pause}>暂停</button>
          <button onClick={resume}>继续</button>
          <button onClick={cancel}>取消</button>
        </div>
      </header>
      <div className="pdf">
        <canvas id="pdf-container"></canvas>
      </div>
      <footer className="footer">
        <button className="btn btn-white" disabled={pages.num < 2} onClick={() => changePage(pages.num - 1)}>
          &lt; 上一页
        </button>
        <input className='input page-num' type="number" value={pages.num} max={pages.total} onChange={changePageNum} />
        <button className="btn btn-white" disabled={pages.num >= pages.total} onClick={() => changePage(pages.num + 1)}>
          下一页 &gt;
        </button>
      </footer>
    </div>
  );
}

export default PDF;
