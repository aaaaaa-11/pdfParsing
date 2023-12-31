import { useContext, useEffect, useRef, useState } from 'react'

import Header from './Header'
import Footer from './Footer'
import Dialog from './Dialog'

import classes from './pdf.module.scss'
import ScaleContext from '@/store/scale-context'

let pdf // 解析到的pdf对象

function PDFPage({ pdfUrl, closePDF }) {
  const [showDialog, setShowDialog] = useState(true) // 是否显示“加载中”
  const [pdfText, setPdfText] = useState() // pdf解析出来的文字
  const [hasPDF, setHasPDF] = useState(false) // 当前是否有pdf，用来判断是否可翻页等
  const [pages, setPages] = useState({
    num: 1,
    total: 1,
  })

  const pageNumRef = useRef() // 页码输入框

  const { scale } = useContext(ScaleContext) // 当前设置的pdf的scale

  // 清除canvas
  const clearCanvas = () => {
    const canvas = document.getElementById('pdf-container')
    if (canvas) {
      const context = canvas.getContext('2d')
      context.clearRect(0, 0, canvas.width, canvas.height)
    }
  }

  useEffect(() => {
    setShowDialog(true)
    // 根据父组件url获取pdf
    pdfUrl && !pdf && openPDF(pdfUrl)
    pageNumRef.current.value = 1

    return () => {
      clearCanvas
      pdf = null
    }
  }, [])

  useEffect(() => {
    // 切换页面 || 第一次进来，渲染pdf
    pdf && renderPage()

    return clearCanvas
  }, [pages.num, hasPDF, scale])

  // 渲染pdf
  const renderPage = () => {
    pdf.getPage(pages.num).then(function (page) {
      page.getTextContent().then((res) => {
        let str = ''
        res?.items.forEach((item) => {
          str += item.str
        })
        setPdfText(str)
      })
      const viewport = page.getViewport({ scale: scale / 100 })
      console.log('renderPage', scale / 100, viewport.width)
      // Support HiDPI-screens.
      const outputScale = window.devicePixelRatio || 1
      const canvas = document.getElementById('pdf-container')
      const context = canvas.getContext('2d')
      canvas.width = Math.floor(viewport.width * outputScale)
      canvas.height = Math.floor(viewport.height * outputScale)
      canvas.style.width = Math.floor(viewport.width) + 'px'
      canvas.style.height = Math.floor(viewport.height) + 'px'
      const transform =
        outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : null
      const renderContext = {
        canvasContext: context,
        transform: transform,
        viewport: viewport,
      }
      page.render(renderContext)
      setShowDialog(false)
    })
  }

  // 加载pdf
  const openPDF = (url) => {
    const loadingTask = pdfjsLib.getDocument(url)
    loadingTask.promise
      .then(function (p) {
        pdf = p
        setHasPDF(true)
        setPages({
          ...pages,
          total: pdf.numPages,
        })
      })
      .catch((e) => {
        alert('加载pdf失败，确认后跳回首页')
        closePDF()
      })
  }

  // 切页面
  const changePageNum = (num) => {
    setPages(() => ({
      ...pages,
      num,
    }))
    pageNumRef.current.value = num
  }

  // 修改页码
  const setPageNum = () => {
    const num = +pageNumRef.current.value
    if (num > pages.total) {
      console.log('The maximum page number is exceeded')
      pageNumRef.current.value = pages.num
    } else {
      num && changePageNum(num)
    }
  }

  return (
    <div className={classes['pdf-page']}>
      <Header pdfText={pdfText} closePDF={closePDF} pageNum={pages.num} />
      <div className={classes.pdf}>
        {showDialog ? <Dialog /> : null}
        <canvas id="pdf-container"></canvas>
      </div>
      <Footer
        ref={pageNumRef}
        changePageNum={changePageNum}
        setPageNum={setPageNum}
        pages={pages}
        hasPDF={hasPDF}
      />
    </div>
  )
}

export default PDFPage
