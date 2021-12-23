import MDEditor from '@uiw/react-md-editor';
import { useEffect, useState, useRef } from 'react';
import './text-editor.css';

const TextEditor: React.FC = () => {
    const [value, setValue] = useState<string | undefined>('');
    const [editing, setEditing] = useState(false);

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
                    value={value}
                    onChange={setValue}
                />
            </div>
        )
    }
    return (
        <div className="text-editor" onClick={() => setEditing(!editing)}>
            <MDEditor.Markdown source={"# Header"} />
        </div>
    )
}

export default TextEditor
