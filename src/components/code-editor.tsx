import MonacoEditor from '@monaco-editor/react';

interface CodeEditorProps {
    initialValue: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue }) => {
    return <MonacoEditor
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