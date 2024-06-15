import React, { useState } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

const Quill: React.FC = () => {
    const [value, setValue] = useState('Welcome to Law Copilot!')
    return (
        <ReactQuill theme='snow' value={value} onChange={setValue}/>
    )
}

export default Quill;