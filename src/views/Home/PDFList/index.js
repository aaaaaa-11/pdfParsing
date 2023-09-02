import { useEffect, useState } from 'react';
import classes from './pdf-list.module.scss';

function PDFList(props) {
  const [pdfList, setPdfList] = useState([])

  useEffect(() => {
    setPdfList(() => [
      {
        id: 1,
        title: '测试.pdf',
        url: '/测试.pdf'
      },
    ])
  }, [])

  const openPDF = (url) => {
    props.openPDF(url)
  }

  return (
    <ul className={classes.pdfs}>
      {
        pdfList.map(p => (
          <li className={classes['pdfs-item']} key={p.id} onClick={() => openPDF(p.url)}>
            { p.title }
          </li>
        ))
      }
    </ul>
  );
}

export default PDFList;
