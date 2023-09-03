import classes from './header.module.scss';
import Speech from './Speech';

function Header({ pdfText, closePDF, pageNum }) {
  return (
    <header className={classes.header}>
      <span className={classes['go-back']} onClick={closePDF}>&lt; 关闭</span>
      <Speech pdfText={pdfText} pageNum={pageNum} />
    </header>
  );
}

export default Header;
