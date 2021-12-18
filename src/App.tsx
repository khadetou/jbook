import { useState, useEffect, useRef } from 'react';
import * as esbuild from 'esbuild-wasm';

function App() {

  //USE REF
  const ref = useRef<any>();

  //USE STATE
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  //ESBUILD 
  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: './esbuild.wasm',
    });
  }

  //FUNCTION TO EXECUTE CODE
  const onClick = async () => {
    if (!ref.current) {
      return;
    }
    const result = await ref.current.transform(input, {
      loader: 'jsx',
      target: 'es2015',
    });
    setCode(result.code);
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
