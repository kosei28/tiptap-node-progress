import { EditorContent, useEditor } from '@tiptap/react';
import './App.css';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import History from '@tiptap/extension-history';
import Dropcursor from '@tiptap/extension-dropcursor';
import { customImage } from './extensions/image';
import Gapcursor from '@tiptap/extension-gapcursor';

function App() {
    const editor = useEditor({
        extensions: [
            Document,
            Paragraph,
            Text,
            History,
            Dropcursor,
            Gapcursor,
            customImage({
                items: [],
                nodeIds: [],
                nodeItemStatusMap: new Map(),
            }).configure({
                allowBase64: true,
            }),
        ],
    });

    return (
        <>
            <EditorContent editor={editor} />
        </>
    );
}

export default App;
