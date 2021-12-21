import MonacoEditor, { OnChange, OnMount } from '@monaco-editor/react';


interface CodeEditorProps {
    initialValue: string;
    onChange: (value?: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
    const onChangeHandler: OnChange = (value, event) => {
        onChange(value);
    }

    const onMountHandler: OnMount = (editor, monaco) => {
        editor.getModel()!.updateOptions({ tabSize: 2 });
    }

    return <MonacoEditor
        onChange={onChangeHandler}
        onMount={onMountHandler}
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