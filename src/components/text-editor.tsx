import MDEditor from '@uiw/react-md-editor';
import { useEffect, useState, useRef } from 'react';
import { useActions } from '../hooks/use-actions';
import { Cell } from '../state';
import './text-editor.css';


interface TextEditorProps {
    cell: Cell;
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
    const [editing, setEditing] = useState(false);
    const { updateCell } = useActions();

    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const listener = (event: MouseEvent) => {
            if (ref.current && event.target && ref.current.contains(event.target as Node)) {
                return;
            }
            setEditing(false);
        }
        document.addEventListener('click', listener, { capture: true });
        return () => {
            document.removeEventListener('click', listener, { capture: true });
        }
    }, [])

    if (editing) {
        return (
            <div className="text-editor" ref={ref}>

                <MDEditor
                    value={cell.content}
                    onChange={(v) => updateCell(cell.id, v || "")}
                />

            </div>
        )
    }
    return (
        <div className="text-editor text-editor-b">
            <div className="card-content">
                <MDEditor.Markdown source={cell.content} />
            </div>
            <button onClick={() => setEditing(!editing)} className="button button-format is-primary is-rounded is-small">Mark Down Editor</button>
        </div>
    )
}

export default TextEditor
