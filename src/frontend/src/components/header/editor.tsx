import { useState } from "react";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";

const Editor = () => {
    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ align: ["right", "center", "justify"] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
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
        "image",
        "background",
        "align",
    ];

    const [code, setCode] = useState("");
    const handleProcedureContentChange = (content: any) => {
        setCode(content);
    };
    return (
        <ReactQuill
            className="md:h-44 h-36"
            placeholder="Describe your event..."
            theme="snow"
            modules={modules}
            formats={formats}
            value={code}
            onChange={handleProcedureContentChange}
        />
    );
}

export default Editor