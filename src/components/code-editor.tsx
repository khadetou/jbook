import { useRef } from 'react';
import MonacoEditor, { OnChange, OnMount } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';

interface CodeEditorProps {
    initialValue: string;
    onChange: (value?: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
    //USE REF
    const editorRef = useRef<any>(null);
    //HANDLER FUNCTIONS
    const onChangeHandler: OnChange = (value, event) => {
        onChange(value);
    }

    const onMountHandler: OnMount = (editor, monaco) => {
        editorRef.current = editor;
        editor.getModel()!.updateOptions({ tabSize: 2 });
    }

    const onFormatClick = () => {
        const unformatted = editorRef.current!.getValue();

        const formatted = prettier.format(unformatted, {
            parser: 'babel',
            plugins: [parser],
            semi: true,
            singleQuote: true,

        });

        editorRef.current!.setValue(formatted);
    }
    return (
        <div>
            <button className="button button-format is-primary is-small" onClick={onFormatClick}>Format</button>
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
                        automaticLayout: true,
                    }
                }

            />
        </div>)
}

export default CodeEditor;