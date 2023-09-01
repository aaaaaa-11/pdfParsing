import { useEffect, useState } from 'react';
import './home.scss';

function Home(props) {
  const [input, setInput] = useState()
  const [pdfList, setPdfList] = useState([])

  useEffect(() => {
    setPdfList(() => [
      {
        id: 1,
        title: '测试 ',
        url: '/测试.pdf'
      },
    ])
  }, [])

  const changeInput = (e) => {
    setInput(e.target.value)
  }

  const openPDF = (url) => {
    props.openPDF(url)
  }

  return (
    <div className="home-page">
      <ul className="pdfs">
        {
          pdfList.map(p => (
            <li className="pdfs-item" key={p.id} onClick={() => openPDF(p.url)}>
              { p.title }
            </li>
          ))
        }
      </ul>
      <input placeholder="请输入PDF地址" type="text" className="pdf-url" onChange={changeInput}></input>
      <button className="btn btn-blue view-btn" disabled={!input} onClick={() => openPDF(input)}>查 看</button>
    </div>
  );
}

export default Home;
