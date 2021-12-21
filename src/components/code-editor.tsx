import MonacoEditor, { OnChange, OnMount } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';

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

    const onFormatClick = () => {

    }
    return (
        <div>
            <button>Format</button>
            <MonacoEditor
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
        </div>)
}

export default CodeEditor;