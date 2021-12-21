import MonacoEditor from '@monaco-editor/react';
import { JsxAttributeLike } from 'typescript';

interface CodeEditorProps {
    initialValue: string;
    onChange: (value: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
    const onChangeHandler = (value: any, event: any) => {
        onChange(value);
    }

    return <MonacoEditor
        onChange={onChangeHandler}
        value={initialValue}
        height="90vh"
        language="javascript"
        theme="vs-dark"
        options={
            {
                wordWrap: 'on',
                minimap: { enabled: false },
                showUnused: false,
                folding: false,
                lineNumbersMinChars: 3,
                fontSize: 16,
                mouseWheelZoom: true,
                scrollBeyondLastLine: false,
                automaticLayout: true
            }
        }

    />
}

export default CodeEditor;