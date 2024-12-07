import React,{useState} from 'react';
import '../CSS/App.css';
import Tela from './tela.jsx';
import Footer from './footer.jsx';
import Suporte from './suporte.jsx';

function App() {
  const [sec, setSec] = useState('principal');
  return (
    <div className="App">
      {sec === 'principal' && (
        <Tela />
      )}
      {sec === 'suporte' && <Suporte setSec={setSec} />}
      <Footer setSec={setSec} />
    </div>
  );
}

export default App;