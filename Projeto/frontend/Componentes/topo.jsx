import React from 'react';
import '../CSS/topo.css';

function Topo() {
  const voltarAoInicio = () => {
    window.location.reload()
  };

  return (
    <div className="topo">
      <img src='Mini.png' alt='Mni' onClick={voltarAoInicio}/>
    </div>
  );
}

export default Topo;