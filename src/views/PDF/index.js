import { ScaleContextProvider } from '@/store/scale-context'
import PDFPage from './PDF'

function PDF({ pdfUrl, closePDF }) {
  return (
    <ScaleContextProvider>
      <PDFPage pdfUrl={pdfUrl} closePDF={closePDF} />
    </ScaleContextProvider>
  )
}

export default PDF
