import { useState } from 'react';
import CodeEditor from '../components/code-editor';
import "bulmaswatch/superhero/bulmaswatch.min.css";
import Preview from '../components/preview';
import bundle from '../bundler';
import Resizable from './resizable';

function CodeCell() {

    //USE STATE
    const [input, setInput] = useState<string | undefined>('');
    const [code, setCode] = useState('');


    //FUNCTION TO EXECUTE CODE
    const onClick = async () => {
        const output = await bundle(input);
        setCode(output);
    };



    //RENDER
    return (
        <Resizable direction="vertical">
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
        </Resizable>
    );
}

export default CodeCell;
