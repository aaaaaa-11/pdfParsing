import { useState } from 'react';
import Home from './views/Home';
import PDF from './views/PDF';

function App() {
  const [pdfUrl, setpdfUrl] = useState()
  const [showPdf, setShowPdf] = useState(false)

  const openPDF = (url) => {
    setShowPdf(true);
    setpdfUrl(url)
  }

  const closePDF = () => {
    setShowPdf(false)
  }

  return (
    <>
      {
        showPdf ? <PDF pdfUrl={pdfUrl} closePDF={closePDF} /> : <Home openPDF={openPDF} />
      }
    </>
  );
}

export default App;
