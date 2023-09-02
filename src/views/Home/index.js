import classes from './home.module.scss';
import Input from './PDFInput';
import PDFList from './PDFList';
import PDFUpload from './PDFUpload';

function Home(props) {

  return (
    <div className={classes['home-page']}>
      <PDFList openPDF={props.openPDF} />
      <PDFUpload openPDF={props.openPDF} />
      <Input openPDF={props.openPDF} />
    </div>
  );
}

export default Home;
