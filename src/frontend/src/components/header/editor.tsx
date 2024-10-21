import { useState } from "react";
import ReactQuill, { ReactQuillProps } from "react-quill";

import "react-quill/dist/quill.snow.css";

const Editor = ({ ...props }: ReactQuillProps) => {
    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ align: ["right", "center", "justify"] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link"],
        ],
    };

    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "link",
        "color",
        "background",
        "align",
    ];
    
    return (
        <ReactQuill
            // placeholder="Describe your event..."
            theme="snow"
            modules={modules}
            formats={formats}
            // value={code}
            // onChange={handleProcedureContentChange}
            {...props}
        />
    );
}

export default Editor