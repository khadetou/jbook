import { useEffect, useRef } from 'react';
import './preview.css';
interface PreviewProps {
  code: string;
}


//Our html page
const html = `
  <!DOCTYPE html>
  <html>
    <head>
      <style>
       html{
         background-color: #fafafa;
       }
      </style>
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


const Preview: React.FC<PreviewProps> = ({ code }) => {
  const iframeRef = useRef<any>();

  useEffect(() => {
    iframeRef.current.srcdoc = html;
    setTimeout(() => {
      iframeRef.current.contentWindow.postMessage(code, '*');
    }, 50);
  }, [code])


  return (
    <div className='preview-wrapper'>
      <iframe
        title="preview"
        ref={iframeRef}
        sandbox='allow-scripts'
        srcDoc={html}
      />
    </div>
  )
}

export default Preview;
