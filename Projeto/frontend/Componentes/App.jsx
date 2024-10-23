import React from 'react';
import '../CSS/App.css';
import Tela from './tela';
import Topo from './topo';

function App() {
  return (
    <div className="App">
      <Topo />
      <Tela />
    </div>
  );
}

export default App;