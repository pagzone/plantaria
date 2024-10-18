import React, { useImperativeHandle, forwardRef } from "react";
import { useQuill } from "react-quilljs";
import BlotFormatter from "quill-blot-formatter";
import "quill/dist/quill.snow.css";

export interface EditorRef {
	getEditorData: () => string;
}

// Using forwardRef to allow passing a ref from the parent component
const Editor = forwardRef<EditorRef>((props, ref) => {
	const { quill, quillRef, Quill } = useQuill({
		modules: { blotFormatter: {} },
	});

	if (Quill && !quill) {
		Quill.register("modules/blotFormatter", BlotFormatter);
	}

	// Use useImperativeHandle to expose a method to the parent component
	useImperativeHandle(ref, () => ({
		getEditorData: () => {
			if (quill) {
				// Return the editor content as HTML
				return quill.root.innerHTML;
			}
			return "";
		},
	}));

	return (
		<div className="md:h-36 h-36 ">
			<div ref={quillRef} />
		</div>
	);
});

export default Editor;