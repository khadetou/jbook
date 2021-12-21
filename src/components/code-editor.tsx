import MonacoEditor from '@monaco-editor/react';

const CodeEditor = () => {
    return <MonacoEditor
        height="90vh"
        language="javascript"
        theme="vs-dark"
    />
}

export default CodeEditor;