import { useState, useEffect, useRef } from 'react';
import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';

function App() {

  //USE REF
  const ref = useRef<any>();
  const iframeRef = useRef<any>();

  //USE STATE
  const [input, setInput] = useState('');
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

    // setCode(result.outputFiles[0].text);
    // iframeRef.current.contentWindow.postMessage(result.outputFiles[0].text, '*');


    iframeRef.current.contentWindow.postMessage(result.outputFiles[0].text, '*');
  };

  //USE EFFECT
  useEffect(() => {
    startService();
  }, []);

  //Our html page
  const html = `
  <!DOCTYPE html>
  <html>
    <head>
     
    </head>
    <body>
      <div id="root"></div>
      <script>
        window.addEventListener('message', (event) => {
          try{
            eval(event.data);
          }catch(e){
            const root = document.getElementById('root');
            root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + e + '</div>';
            console.error(e);
          }
        }, false);
      </script>
    </body>
  </html>
  `;

  //RENDER
  return (
    <div>
      <textarea value={input} onChange={(e) => setInput(e.target.value)}></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <pre>{code}</pre>
      <iframe ref={iframeRef} sandbox='allow-scripts' srcDoc={html} />
    </div>
  );
}

export default App;
