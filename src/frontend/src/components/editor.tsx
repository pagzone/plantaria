import { useQuill } from 'react-quilljs';
import BlotFormatter from 'quill-blot-formatter';
import 'quill/dist/quill.snow.css';

const Editor = () => {
    const { quill, quillRef, Quill } = useQuill({
        modules: { blotFormatter: {} }
    });

    if (Quill && !quill) {
        Quill.register('modules/blotFormatter', BlotFormatter);
    }

    return (
        <div className='md:h-36 h-36 '>
            <div ref={quillRef} />
        </div>
    );
};

export default Editor;
