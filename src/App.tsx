import React, { useState, useEffect } from 'react';
import * as esbuild from 'esbuild-wasm';

function App() {

  //USE STATE
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  //ESBUILD 
  const startService = async () => {
    const service = await esbuild.startService({
      worker: true,
      wasmURL: './esbuild.wasm',
    });
    console.log(service);
  }

  //FUNCTION TO EXECUTE CODE
  const onClick = () => {
    setCode(input);
  };

  //USE EFFECT
  useEffect(() => {
    startService();
  }, []);

  //RENDER
  return (
    <div>
      <textarea value={input} onChange={(e) => setInput(e.target.value)}></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <pre>{code}</pre>
    </div>
  );
}

export default App;
