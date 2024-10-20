import React, { useImperativeHandle, forwardRef } from "react";
import { useQuill } from "react-quilljs";
import BlotFormatter from "quill-blot-formatter";
import "quill/dist/quill.snow.css";

export interface EditorRef {
	getEditorData: () => string;
	getEditorText: () => string;
	setEditorData: (data: string) => void;
	resetEditor: () => void;
}

// Using forwardRef to allow passing a ref from the parent component
const Editor = forwardRef<EditorRef>((props, ref) => {
	const { quill, quillRef, Quill } = useQuill({
		modules: { blotFormatter: {} },
	});

	if (Quill && !quill) {
		Quill.register("modules/blotFormatter", BlotFormatter);
	}

	useImperativeHandle(ref, () => ({
		getEditorData: () => {
			if (quill) {
				return quill.root.innerHTML;
			}
			return "";
		},

		getEditorText: () => {
			if (quill) {
				return quill.getText();
			}
			return "";
		},

		setEditorData: (data: string) => {
			if (quill) {
				quill.root.innerHTML = data;
			}
		},

		resetEditor: () => {
			if (quill) {
				quill.setContents([]);
			}
		},
	}));

	return (
		<div>
			<div ref={quillRef} />
		</div>
	);
});

export default Editor;
