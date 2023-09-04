import { useEffect, useRef, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import classes from './pdf.module.scss';
import Dialog from './Dialog';

function PDF({ pdfUrl, closePDF }) {
  const [pdf, setPdf] = useState();
  const [showDialog, setShowDialog] = useState(true)
  const [pdfText, setPdfText] = useState();
  const [hasPDF, setHasPDF] = useState(false);
  const [pages, setPages] = useState({
    num: 1,
    total: 1,
  });

  const pageNumRef = useRef()


  useEffect(() => {
    setShowDialog(true)
    // 根据父组件url获取pdf
    pdfUrl && openPDF(pdfUrl);
    pageNumRef.current.value = 1

    return () => {
      // 清除canvas
      const canvas = document.getElementById('pdf-container');
      if (canvas) {
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        console.log('clear');
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
      setShowDialog(false)
    });
  };

  // 加载pdf
  const openPDF = (url) => {
    console.log('openPDF');
    const loadingTask = pdfjsLib.getDocument(url);
    loadingTask.promise.then(function (pdf) {
      console.log('set pdf');
      setPdf(pdf);
      setHasPDF(true);
      setPages({
        ...pages,
        total: pdf.numPages,
      });
    }).catch(e => {
      alert('加载pdf失败，确认后跳回首页')
      closePDF()
    });
  };

  // 切页面
  const changePageNum = (num) => {
    console.log('changePage');
    setPages(() => ({
      ...pages,
      num
    }))
    pageNumRef.current.value = num;
  }

  // 修改页码
  const setPageNum = () => {
    const num = +pageNumRef.current.value
    if (num > pages.total) {
      console.log('The maximum page number is exceeded');
    } else {
      num && changePageNum(num)
    }
  }

  return (
    <div className={classes['pdf-page']}>
      <Header pdfText={pdfText} closePDF={closePDF} pageNum={pages.num} />
      <div className={classes.pdf}>
        {
          showDialog ? <Dialog /> : null
        }
        <canvas id="pdf-container"></canvas>
      </div>
      <Footer ref={pageNumRef} changePageNum={changePageNum} setPageNum={setPageNum} pages={pages} hasPDF={hasPDF} />
    </div>
  );
}

export default PDF;
