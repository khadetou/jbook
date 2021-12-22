import { useState, useEffect, useRef } from 'react';
import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';
import CodeEditor from './components/code-editor';
import "bulmaswatch/superhero/bulmaswatch.min.css";
import Preview from './components/preview';

function App() {

  //USE REF
  const ref = useRef<any>();


  //USE STATE
  const [input, setInput] = useState<string | undefined>('');
  const [code, setCode] = useState('');

  //ESBUILD 
  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
    });
  }

  //FUNCTION TO EXECUTE CODE
  const onClick = async () => {
    if (!ref.current) {
      return;
    }



    const result = await ref.current.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [
        unpkgPathPlugin(),
        fetchPlugin(input)
      ],
      define: {
        'process.env.NODE_ENV': '"development"',
        global: 'window',
      }
    });

    setCode(result.outputFiles[0].text);
  };

  //USE EFFECT
  useEffect(() => {
    startService();
  }, []);


  //RENDER
  return (
    <div>
      <CodeEditor
        initialValue="const a = 1;"
        onChange={(value) => setInput(value)}
      />
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <Preview code={code} />
    </div>
  );
}

export default App;
