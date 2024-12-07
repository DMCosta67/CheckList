import React,{useState} from 'react';
import '../CSS/footer.css';

function Footer({setSec}) {

  return (
    <div className="footer">
      <p>© Todos os direitos reservados a CheckList Group </p>
      <span className='suppCall' onClick={() => setSec('suporte')}>Canal de Suporte</span>
    </div>
  );
}

export default Footer;